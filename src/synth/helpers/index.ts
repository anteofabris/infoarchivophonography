
export function applyDeviation(startFreq: number, endFreq: number, pitch: number, factor: number) {
    // Calculate the relative position of the pitch within the frequency range
    const logStartFreq = Math.log(startFreq);
    const logEndFreq = Math.log(endFreq);
    const logPitch = Math.log(pitch);
    
    // Find where the pitch lies in the frequency range (0 to 1)
    const relativePosition = (logPitch - logStartFreq) / (logEndFreq - logStartFreq);
    
    // Apply deviation by adjusting the relative position
    const newRelativePosition = relativePosition + (factor * 0.1); // 0.1 can be changed for more/less deviation
    
    // Ensure the new relative position stays within the bounds [0, 1]
    const clampedPosition = Math.max(0, Math.min(1, newRelativePosition));
    
    // Convert the new relative position back to the frequency scale
    const newPitch = Math.exp(logStartFreq + clampedPosition * (logEndFreq - logStartFreq));
    
    return newPitch;
  }