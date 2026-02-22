'use client'

import Script from 'next/script'

interface ConsoleMessageProps {
  ownerEmail: string
  ownerGithub: string
  ownerTitle: string
}

// Console message for devs - desktop only (no one inspects on mobile)
export function ConsoleMessage({ ownerEmail, ownerGithub, ownerTitle }: ConsoleMessageProps) {
  const ownerGithubHandle = ownerGithub.replace('https://github.com/', '')

  return (
    <Script
      id="console-message"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            setTimeout(function() {
              console.log('%c\\n  ___  ___ _____  __  ___  __ _  ___\\n / _ \\\\/ _ \\_   _|/__\\\\| __\\\\/  | |/ _ \\\\\\n|  __/ (_) || | / \\\\// _| _ | |_| (_) |\\n \\\\___| .__/ |_|/_/\\\\_\\\\___|_| |_(_)\\\\___/\\n     |_|\\n', 'color: #666; font-family: monospace;');
              console.log('%c> system.info()', 'color: #22c55e; font-family: monospace; font-size: 12px;');
              console.log('%c  role: %c${ownerTitle}\\n%c  stack: %cNext.js | TypeScript | Neon DB\\n%c  status: %cOpen to opportunities', 'color: #666;', 'color: #fafafa;', 'color: #666;', 'color: #fafafa;', 'color: #666;', 'color: #22c55e;');
              console.log('%c> contact.get()', 'color: #22c55e; font-family: monospace; font-size: 12px;');
              console.log('%c  email: %c${ownerEmail}\\n%c  github: %cgithub.com/${ownerGithubHandle}', 'color: #666;', 'color: #60a5fa;', 'color: #666;', 'color: #60a5fa;');
            }, 2000);
          }
        `
      }}
    />
  )
}
