import { useEffect } from 'react';

type SoundName = 'tap' | 'nav' | 'swish' | 'open' | 'close' | 'confirm' | 'toggle' | 'none';

class UiSoundEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;

  private getContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;

      this.ctx = new AudioCtx();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.55;
      this.master.connect(this.ctx.destination);
    }

    return this.ctx;
  }

  play(sound: SoundName = 'tap') {
    if (sound === 'none') return;

    void this.playUnlocked(sound);
  }

  private async playUnlocked(sound: SoundName) {
    const ctx = this.getContext();
    if (!ctx || !this.master) return;

    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    switch (sound) {
      case 'swish':
        this.swish(ctx, 0.28, 650, 3600);
        break;
      case 'open':
        this.swish(ctx, 0.24, 520, 3300);
        this.tone(ctx, 0.04, 0.2, 392, 784, 0.11, 'sine');
        break;
      case 'close':
        this.swish(ctx, 0.18, 2800, 520);
        this.tone(ctx, 0.02, 0.14, 330, 196, 0.09, 'triangle');
        break;
      case 'confirm':
        this.tone(ctx, 0.01, 0.1, 392, 523, 0.1, 'sine');
        this.tone(ctx, 0.075, 0.18, 523, 784, 0.11, 'sine');
        break;
      case 'nav':
        this.tone(ctx, 0.01, 0.08, 440, 660, 0.08, 'triangle');
        break;
      case 'toggle':
        this.tone(ctx, 0.01, 0.11, 260, 520, 0.09, 'sine');
        break;
      case 'tap':
      default:
        this.tone(ctx, 0.01, 0.07, 720, 420, 0.075, 'triangle');
    }
  }

  private tone(
    ctx: AudioContext,
    delay: number,
    duration: number,
    from: number,
    to: number,
    volume: number,
    type: OscillatorType,
  ) {
    if (!this.master) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(from, now);
    osc.frequency.exponentialRampToValueAtTime(Math.max(1, to), now + duration);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.master);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  private swish(ctx: AudioContext, duration: number, from: number, to: number) {
    if (!this.master) return;

    const now = ctx.currentTime;
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * duration), ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    }

    const source = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    source.buffer = buffer;
    filter.type = 'bandpass';
    filter.Q.value = 1.4;
    filter.frequency.setValueAtTime(from, now);
    filter.frequency.exponentialRampToValueAtTime(to, now + duration);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.07, now + 0.035);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    source.start(now);
    source.stop(now + duration + 0.02);
  }
}

const soundEngine = new UiSoundEngine();

export function useSoundEffects() {
  useEffect(() => {
    const playForTarget = (target: HTMLElement | null) => {
      const interactive = target?.closest<HTMLElement>('[data-sound], button, a, [role="button"]');
      if (!interactive || interactive.hasAttribute('disabled')) return;
      if (target?.closest('input, textarea, select')) return;

      const sound = (interactive.dataset.sound || 'tap') as SoundName;
      soundEngine.play(sound);
    };

    const handlePointerDown = (event: PointerEvent) => {
      playForTarget(event.target as HTMLElement | null);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      playForTarget(event.target as HTMLElement | null);
    };

    document.addEventListener('pointerdown', handlePointerDown, { capture: true, passive: true });
    document.addEventListener('keydown', handleKeyDown, { capture: true });

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, { capture: true });
      document.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, []);
}
