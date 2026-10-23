import { loadFont } from '@remotion/fonts';
import { staticFile } from 'remotion';
import { fonts } from './brand';

export const fontsLoaded = Promise.all([
  loadFont({
    family: fonts.display,
    url: staticFile('fonts/orbitron-variable-latin.woff2'),
    weight: '500 900',
  }),
  loadFont({
    family: fonts.body,
    url: staticFile('fonts/opensans-variable-latin.woff2'),
    weight: '300 800',
  }),
]);
