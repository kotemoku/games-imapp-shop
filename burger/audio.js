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
      sfxMaster.gain.setValueAtTime(0.40, context.currentTime);
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
    const popScale = [523.25, 587.33, 659.25, 783.99, 880.00, 987.77];
    const group = Math.abs(ingredient + layer) % popScale.length;
    const lift = Math.min(layer, 10) * 13;
    const root = popScale[group] + lift;
    playTone(root / 2, now, 0.085, 'triangle', 0.22, sfxMaster, root * 0.82);
    playTone(root, now + 0.010, 0.072, 'square', 0.15, sfxMaster, root * 1.42);
    playTone(root * 1.5, now + 0.055, 0.070, 'sine', 0.13, sfxMaster, root * 2.0);
    playTone(root * 2.0, now + 0.105, 0.052, 'square', 0.075, sfxMaster);
    playNoise(now + 0.004, 0.045, 0.075, 3600 + group * 360);

    if (complete) {
      const chord = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      chord.forEach((note, index) => {
        playTone(note, now + 0.050 + index * 0.040, 0.20, index % 2 ? 'sine' : 'square', 0.105, sfxMaster);
      });
      playTone(1046.50, now + 0.245, 0.18, 'sine', 0.14, sfxMaster, 1567.98);
      playTone(196.00, now + 0.035, 0.30, 'triangle', 0.16, sfxMaster, 98.00);
      playNoise(now + 0.020, 0.090, 0.11, 5200);
    }
  }

  async function cook() {
    if (!(await ensureAudio())) return;
    const now = context.currentTime + 0.005;
    playNoise(now, 0.16, 0.095, 3100);
    playTone(392, now, 0.06, 'sine', 0.085, sfxMaster, 560);
    playTone(659.25, now + 0.055, 0.065, 'square', 0.07, sfxMaster, 783.99);
  }

  async function mistake() {
    if (!(await ensureAudio())) return;
    const now = context.currentTime + 0.005;
    playTone(392, now, 0.12, 'square', 0.13, sfxMaster, 246.94);
    playTone(293.66, now + 0.075, 0.16, 'triangle', 0.12, sfxMaster, 174.61);
    playTone(146.83, now + 0.180, 0.12, 'sine', 0.10, sfxMaster, 130.81);
    playNoise(now + 0.020, 0.050, 0.07, 1800);
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
