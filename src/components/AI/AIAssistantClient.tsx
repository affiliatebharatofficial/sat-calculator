'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const AIAssistant = dynamic(() => import('./AIAssistant'), {
  ssr: false,
});

export default function AIAssistantClient() {
  return <AIAssistant />;
}
