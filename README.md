# Plivo Browser SDK - Noise Reduction 

This Chrome extension demonstrates how to properly implement the Noise Reduction feature offered by the plivo-browser-sdk while working around Chrome's Content Security Policy restrictions.

## The Problem

The Plivo Browser SDK's noise reduction feature normally fetches a required script from Plivo's CDN at runtime. However, this gets blocked by Chrome's strict Content Security Policy (CSP) in extension environments. This demo shows how to properly bundle and load the script locally instead.

## Project Configuration

This project is built with:
- TypeScript for type-safe development
- Webpack for bundling and compilation

## Build
To get started, run the following commands:

```
npm install
npm run build
```


This will bundle the extension which can then be loaded into Chrome.

## Implementing Noise Reduction

### 1. Script File Setup
- Copy the `processor.js` script file into your codebase (in this demo it's placed in the `src` folder)
- Include `'wasm-unsafe-eval'` in the `script-src` directive of your manifest.json's Content Security Policy. This is required for the noise reduction script to be loaded properly. For reference, check the manifest.json file in this project.

- Make sure Webpack includes the file in your final bundle (in this project, it's compiled into the `dist/js` folder)
- When initializing the plivo-browser-sdk, provide the path to the compiled script in the `noiseReductionFilePath` field:

```typescript
const client = new Client({
// other config options...
noiseReductionFilePath: './processor.js'  // While the file exists in src/processor.js, specify the path where it will be in the compiled bundle
});
```

### 2. Verify Loading
To confirm the noise reduction feature is working properly, first log into the SDK and then listen for the `onNoiseReductionReady` event:


```typescript
client.login(username, password);

client.on('onNoiseReductionReady', () => {
    console.log('Noise reduction script loaded successfully');
});
```