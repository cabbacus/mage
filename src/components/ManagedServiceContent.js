'use client';

import React from 'react';
import { Scrollbar } from 'react-scrollbars-custom';

export default function ManagedServiceContent({ description }) {
  return (
    <Scrollbar>
        <div dangerouslySetInnerHTML={{ __html: description }} />
    </Scrollbar>
    // 
  );
}
