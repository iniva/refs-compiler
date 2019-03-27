/* global describe it expect */
import path from 'path';
import ini from 'ini';
import yaml from 'js-yaml';

import transform from './transform';
import extract from './extract';
import { handler as jsonHandler } from '../processors/json';
import { handler as yamlHandler } from '../processors/yaml';
import { handler as iniHandler } from '../processors/ini';

const options = {
  encoding: 'utf8',
  schema: yaml.DEFAULT_FULL_SCHEMA,
};

const yamlParser = data => yaml.safeLoad(data, options);
const TEST_DATA_DIR = path.resolve(__dirname, '../../test/data');

describe('Utils: Transform', () => {
  it('should transform a JSON structure into parseable JSON format', async () => {
    const extracted = await extract(`${TEST_DATA_DIR}/file-refs.json`, JSON.parse);
    const transformed = await transform(extracted, undefined, `${TEST_DATA_DIR}/file-refs.json`, jsonHandler);
    const parsed = JSON.parse(transformed.dataString);

    expect(typeof parsed).toEqual('object');
    expect(Object.keys(parsed)).toEqual(['another']);
    expect(Object.keys(parsed.another)).toEqual(['test']);
  });

  it('should transform a YAML structure into parseable JSON format', async () => {
    const extracted = await extract(`${TEST_DATA_DIR}/file-refs.yaml`, yamlParser);
    const transformed = await transform(extracted, undefined, `${TEST_DATA_DIR}/file-refs.yaml`, yamlHandler);
    const parsed = JSON.parse(transformed.dataString);

    expect(typeof parsed).toEqual('object');
    expect(Object.keys(parsed)).toEqual(['another']);
    expect(Object.keys(parsed.another)).toEqual(['test']);
  });

  it('should transform an INI structure into parseable JSON format', async () => {
    const extracted = await extract(`${TEST_DATA_DIR}/file-refs.ini`, ini.parse);
    const transformed = await transform(extracted, undefined, `${TEST_DATA_DIR}/file-refs.ini`, iniHandler);
    const parsed = JSON.parse(transformed.dataString);

    expect(typeof parsed).toEqual('object');
    expect(Object.keys(parsed)).toEqual(['another']);
    expect(Object.keys(parsed.another)).toEqual(['test']);
  });
});
