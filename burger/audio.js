(() => {
  'use strict';

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  let context = null;
  let master = null;
  let timer = null;
  let nextStepAt = 0;
  let step = 0;
  let running = false;

  const stepSeconds = 0.15;
  const melody = [
    659.25, 783.99, 880.00, 987.77,
    880.00, 783.99, 659.25, 587.33,
    523.25, 659.25, 783.99, 880.00,
    783.99, 659.25, 587.33, 392.00,
    659.25, 783.99, 987.77, 1046.50,
    987.77, 880.00, 783.99, 659.25,
    587.33, 659.25, 783.99, 587.33,
    659.25, 523.25, 587.33, null,
  ];
  const bass = [
    130.81, null, 130.81, null,
    110.00, null, 110.00, null,
    87.31, null, 87.31, null,
    98.00, null, 98.00, null,
    130.81, null, 130.81, null,
    146.83, null, 146.83, null,
    87.31, null, 98.00, null,
    130.81, null, 98.00, null,
  ];

  function playTone(frequency, startAt, duration, type, volume) {
    if (!frequency || !context || !master) return;
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startAt);
    envelope.gain.setValueAtTime(0.0001, startAt);
    envelope.gain.exponentialRampToValueAtTime(volume, startAt + 0.008);
    envelope.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
    oscillator.connect(envelope);
    envelope.connect(master);
    oscillator.start(startAt);
    oscillator.stop(startAt + duration + 0.02);
  }

  function scheduleStep() {
    if (!running || !context) return;
    while (nextStepAt < context.currentTime + 0.12) {
      const melodyNote = melody[step % melody.length];
      const bassNote = bass[step % bass.length];
      playTone(melodyNote, nextStepAt, stepSeconds * 0.78, 'square', 0.085);
      playTone(bassNote, nextStepAt, stepSeconds * 1.7, 'triangle', 0.13);
      if (step % 4 === 2 && melodyNote) {
        playTone(melodyNote / 2, nextStepAt, stepSeconds * 0.35, 'square', 0.025);
      }
      step += 1;
      nextStepAt += stepSeconds;
    }
    timer = window.setTimeout(scheduleStep, 30);
  }

  async function start() {
    if (!AudioContextClass || running) return;
    context = context || new AudioContextClass();
    await context.resume();
    running = true;
    step = 0;
    nextStepAt = context.currentTime + 0.04;
    master = context.createGain();
    master.gain.setValueAtTime(0.0001, context.currentTime);
    master.gain.exponentialRampToValueAtTime(0.16, context.currentTime + 0.08);
    master.connect(context.destination);
    scheduleStep();
  }

  function stop() {
    if (!running) return;
    running = false;
    if (timer !== null) {
      window.clearTimeout(timer);
      timer = null;
    }
    if (context && master) {
      const oldMaster = master;
      oldMaster.gain.cancelScheduledValues(context.currentTime);
      oldMaster.gain.setValueAtTime(Math.max(oldMaster.gain.value, 0.0001), context.currentTime);
      oldMaster.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.12);
      window.setTimeout(() => oldMaster.disconnect(), 180);
      master = null;
    }
  }

  window.burgerAudio = Object.freeze({ start, stop });
})();
