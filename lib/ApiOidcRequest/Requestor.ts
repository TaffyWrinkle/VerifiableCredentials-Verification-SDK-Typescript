/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IResponse, RequestorBuilder } from '../index';

/**
 * Class to model the OIDC requestor
 */
export default class Requestor {

  constructor(
    private _builder: RequestorBuilder) {
  } 

  /**
   * Gets the builder for the request
   */
  public get builder(): RequestorBuilder {
    return this._builder;
  }

  /**
   * Create the actual request
   */
  public async create(): Promise<IResponse> {
    let payload: any = {
      response_type: 'idtoken',
      response_mode: 'form_post',
      client_id: this.builder.clientId,
      redirect_uri: this.builder.redirectUri,
      iss: this.builder.issuer,
      scope: 'openid did_authn',
      state: this.builder.state,
      nonce: this.builder.nonce,
      attestations: this.builder.attestation,
      prompt: 'create',
      registration: {
        client_name: this.builder.clientName,
        client_purpose: this.builder.clientPurpose,
        tos_uri: this.builder.tosUri
      }
    };
    // Add optional fields
    if (this.builder.logoUri) {
      payload.logo_uri = this.builder.logoUri;
    }
    return new Promise((resolve) => {
      resolve({
        status: 200,
        result: true,
        payload
      } as any);
    })
  }

}
