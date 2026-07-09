import 'server-only';
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config.js';

const reader = createReader(process.cwd(), keystaticConfig);

export default reader;
