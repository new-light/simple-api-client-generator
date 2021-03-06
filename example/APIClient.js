/* @flow */
/* eslint-disable */
import extend from 'extend';
import assert from 'power-assert';
import tv4 from 'tv4';
import uriTemplates from 'uri-templates';
import SimpleAPIClient from '@moqada/simple-api-client';
import type {APIOption} from '@moqada/simple-api-client';

/* Resources */
export type Info = {
publishedAt?: string,
id?: string,
title?: string,
content?: string
}

export type Machine = {
id?: string,
name?: string
}

export type User = {
id: string,
firstName: string,
lastName: string,
birthday: string,
tel?: string,
registeredAt: string,
addressZip?: string,
addressState?: string,
addressCity?: string,
addressLine1?: string,
addressLine2?: string,
machine?:   {
    id?: string,
    name?: string
  },
infos?:     {
      publishedAt?: string,
      id?: string,
      title?: string,
      content?: string
    }[]
}

/* Links */
export type InfoInstancesResponse = {
publishedAt?: string,
id?: string,
title?: string,
content?: string
}

export type UserCreateRequest = {
firstName: string,
lastName: string,
password: string,
birthday: string
}

export type UserCreateResponse = {
id: string,
firstName: string,
lastName: string,
birthday: string,
tel?: string,
registeredAt: string,
addressZip?: string,
addressState?: string,
addressCity?: string,
addressLine1?: string,
addressLine2?: string,
machine?:   {
    id?: string,
    name?: string
  },
infos?:     {
      publishedAt?: string,
      id?: string,
      title?: string,
      content?: string
    }[]
}

export type UserSelfResponse = {
id: string,
firstName: string,
lastName: string,
birthday: string,
tel?: string,
registeredAt: string,
addressZip?: string,
addressState?: string,
addressCity?: string,
addressLine1?: string,
addressLine2?: string,
machine?:   {
    id?: string,
    name?: string
  },
infos?:     {
      publishedAt?: string,
      id?: string,
      title?: string,
      content?: string
    }[]
}

/**
 * APIClient
 */
export default class APIClient extends SimpleAPIClient {

  toResponse(error: ?Object, response: ?Object): Object {
    return {
      body: response && response.body,
      error: error,
      headers: response && response.headers,
      status: response && response.status
    };
  }

  /**
   * 
   */
  infoInstances(options?: APIOption): Promise<{body: InfoInstancesResponse, headers: Object, status: number}> {
    const tpl = uriTemplates('/info');
    const path = tpl.fill({});
    let opts = options || {};
    opts = extend(opts, options);
    return this.get(path, opts);
  }

  /**
   * ユーザ登録
   */
  userCreate(params: UserCreateRequest, options?: APIOption): Promise<{body: UserCreateResponse, headers: Object, status: number}> {
    const tpl = uriTemplates('/users');
    const path = tpl.fill({});
    let opts = options || {};
    const data = params;
    assert.deepEqual(
      tv4.validateMultiple(data, {"properties":{"firstName":{"description":"名","readOnly":true,"example":"わかる","type":["string"]},"lastName":{"description":"姓","readOnly":true,"example":"わたり","type":["string"]},"password":{"description":"パスワード","example":"pass","type":["string"]},"birthday":{"description":"生年月日","pattern":"^[0-9]{4}-[0-9]{2}-[0-9]{2}$","example":"1985-04-20","type":["string"]}},"type":["object"],"required":["firstName","lastName","email","password","birthday"]} ),
      {errors: [], missing: [], valid: true}
    );
    opts = Object.assign(opts, {
      data: data
    });
    opts = extend(opts, options);
    return this.post(path, opts);
  }

  /**
   * ログイン中ユーザのアカウント情報
   */
  userSelf(options?: APIOption): Promise<{body: UserSelfResponse, headers: Object, status: number}> {
    const tpl = uriTemplates('/users/me');
    const path = tpl.fill({});
    let opts = options || {};
    opts = extend(opts, options);
    return this.get(path, opts);
  }

}
