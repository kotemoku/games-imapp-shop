(() => {
  'use strict';

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  let context = null;
  let master = null;
  let sfxMaster = null;
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

  function playTone(frequency, startAt, duration, type, volume, output = master, endFrequency = null) {
    if (!frequency || !context || !output) return;
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startAt);
    if (endFrequency) {
      oscillator.frequency.exponentialRampToValueAtTime(endFrequency, startAt + duration);
    }
    envelope.gain.setValueAtTime(0.0001, startAt);
    envelope.gain.exponentialRampToValueAtTime(volume, startAt + 0.008);
    envelope.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
    oscillator.connect(envelope);
    envelope.connect(output);
    oscillator.start(startAt);
    oscillator.stop(startAt + duration + 0.02);
  }

  async function ensureAudio() {
    if (!AudioContextClass) return false;
    context = context || new AudioContextClass();
    await context.resume();
    if (!sfxMaster) {
      sfxMaster = context.createGain();
      sfxMaster.gain.setValueAtTime(0.32, context.currentTime);
      sfxMaster.connect(context.destination);
    }
    return true;
  }

  function playNoise(startAt, duration, volume, cutoff) {
    if (!context || !sfxMaster) return;
    const frames = Math.max(1, Math.floor(context.sampleRate * duration));
    const buffer = context.createBuffer(1, frames, context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < frames; i += 1) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / frames);
    }
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const envelope = context.createGain();
    source.buffer = buffer;
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(cutoff, startAt);
    envelope.gain.setValueAtTime(volume, startAt);
    envelope.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
    source.connect(filter);
    filter.connect(envelope);
    envelope.connect(sfxMaster);
    source.start(startAt);
    source.stop(startAt + duration + 0.01);
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
    if (!(await ensureAudio())) return;
    running = true;
    step = 0;
    nextStepAt = context.currentTime + 0.04;
    master = context.createGain();
    master.gain.setValueAtTime(0.0001, context.currentTime);
    master.gain.exponentialRampToValueAtTime(0.16, context.currentTime + 0.08);
    master.connect(context.destination);
    scheduleStep();
  }


  async function stack(ingredient, layer, complete) {
    if (!(await ensureAudio())) return;
    const now = context.currentTime + 0.006;
    const group = ingredient % 5;
    const lift = Math.min(layer, 10) * 8;
    const body = [118, 92, 142, 178, 210][group] + lift;
    playTone(body, now, 0.13, 'triangle', 0.34, sfxMaster, Math.max(58, body * 0.55));
    playTone(420 + group * 62 + lift, now + 0.018, 0.075, 'square', 0.11, sfxMaster, 260 + lift);
    playNoise(now, 0.055, 0.10, 1000 + group * 260);

    if (complete) {
      const chord = [523.25, 659.25, 783.99, 1046.50];
      chord.forEach((note, index) => {
        playTone(note, now + 0.055 + index * 0.055, 0.22, 'square', 0.10, sfxMaster);
      });
      playTone(130.81, now + 0.04, 0.32, 'triangle', 0.24, sfxMaster, 65.41);
    }
  }

  async function cook() {
    if (!(await ensureAudio())) return;
    const now = context.currentTime + 0.005;
    playNoise(now, 0.18, 0.12, 2600);
    playTone(330, now, 0.09, 'square', 0.08, sfxMaster, 520);
  }

  async function mistake() {
    if (!(await ensureAudio())) return;
    const now = context.currentTime + 0.005;
    playTone(180, now, 0.24, 'sawtooth', 0.19, sfxMaster, 72);
    playTone(128, now + 0.045, 0.20, 'square', 0.10, sfxMaster, 64);
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

  window.burgerAudio = Object.freeze({ start, stop, stack, cook, mistake });
})();
