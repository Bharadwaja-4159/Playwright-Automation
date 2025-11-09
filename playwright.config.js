// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { on } from 'events';

const config=({
  testDir: './tests',
  timeout: 30*1000,
  expect:{
    timeout:40*1000
    
  },
  reporter: 'html',
  use:{
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'on'
  },
});
module.exports=config
  