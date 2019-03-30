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
  it('should transform a single JSON structure into parseable JSON format', async () => {
    const targetFile = `${TEST_DATA_DIR}/file.json`;
    const extracted = await extract(targetFile, JSON.parse);
    const transformed = await transform(extracted, undefined, targetFile, jsonHandler);
    const parsed = JSON.parse(transformed.dataString);

    expect(typeof parsed).toEqual('object');
    expect(Object.keys(parsed)).toEqual(['test']);
  });

  it('should transform a JSON structure with references into parseable JSON format', async () => {
    const targetFile = `${TEST_DATA_DIR}/file-refs.json`;
    const extracted = await extract(targetFile, JSON.parse);
    const transformed = await transform(extracted, undefined, targetFile, jsonHandler);
    const parsed = JSON.parse(transformed.dataString);

    expect(typeof parsed).toEqual('object');
    expect(Object.keys(parsed)).toEqual(['another']);
    expect(Object.keys(parsed.another)).toEqual(['test']);
  });

  it('should transform a JSON structure with merge directives into parseable JSON format', async () => {
    const targetFile = `${TEST_DATA_DIR}/file-merge.json`;
    const extracted = await extract(targetFile, JSON.parse);
    const transformed = await transform(extracted, undefined, targetFile, jsonHandler);
    const parsed = JSON.parse(transformed.dataString);

    expect(typeof parsed).toEqual('object');
    expect(Object.keys(parsed)).toEqual(['test']);
    expect(Object.keys(parsed.test)).toEqual(['test', 'another']);
  });

  it('should transform a single YAML structure into parseable JSON format', async () => {
    const targetFile = `${TEST_DATA_DIR}/file.yaml`;
    const extracted = await extract(targetFile, yamlParser);
    const transformed = await transform(extracted, undefined, targetFile, yamlHandler);
    const parsed = JSON.parse(transformed.dataString);

    expect(typeof parsed).toEqual('object');
    expect(Object.keys(parsed)).toEqual(['test']);
  });

  it('should transform a YAML structure with references into parseable JSON format', async () => {
    const targetFile = `${TEST_DATA_DIR}/file-refs.yaml`;
    const extracted = await extract(targetFile, yamlParser);
    const transformed = await transform(extracted, undefined, targetFile, yamlHandler);
    const parsed = JSON.parse(transformed.dataString);

    expect(typeof parsed).toEqual('object');
    expect(Object.keys(parsed)).toEqual(['another']);
    expect(Object.keys(parsed.another)).toEqual(['test']);
  });

  it('should transform a YAML structure with merge directives into parseable JSON format', async () => {
    const targetFile = `${TEST_DATA_DIR}/file-merge.yaml`;
    const extracted = await extract(targetFile, yamlParser);
    const transformed = await transform(extracted, undefined, targetFile, yamlHandler);
    const parsed = JSON.parse(transformed.dataString);

    expect(typeof parsed).toEqual('object');
    expect(Object.keys(parsed)).toEqual(['test']);
    expect(Object.keys(parsed.test)).toEqual(['test', 'another']);
  });

  it('should transform a single INI structure into parseable JSON format', async () => {
    const targetFile = `${TEST_DATA_DIR}/file.ini`;
    const extracted = await extract(targetFile, ini.parse);
    const transformed = await transform(extracted, undefined, targetFile, iniHandler);
    const parsed = JSON.parse(transformed.dataString);

    expect(typeof parsed).toEqual('object');
    expect(Object.keys(parsed)).toEqual(['test']);
  });

  it('should transform an INI structure with references into parseable JSON format', async () => {
    const targetFile = `${TEST_DATA_DIR}/file-refs.ini`;
    const extracted = await extract(targetFile, ini.parse);
    const transformed = await transform(extracted, undefined, targetFile, iniHandler);
    const parsed = JSON.parse(transformed.dataString);

    expect(typeof parsed).toEqual('object');
    expect(Object.keys(parsed)).toEqual(['another']);
    expect(Object.keys(parsed.another)).toEqual(['test']);
  });

  it('should throw when using merge directives in an INI file', async () => {
    const targetFile = `${TEST_DATA_DIR}/file-merge.ini`;
    const extracted = await extract(targetFile, ini.parse);

    await expect(transform(extracted, undefined, targetFile, iniHandler))
      .rejects
      .toThrow('Malformed merge setting, please check the input file.');
  });
});
