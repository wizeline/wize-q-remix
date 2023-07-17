import React from 'react';
import { RemixServer } from '@remix-run/react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';

export default function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext,
) {
  const sheet = new ServerStyleSheet();

  let markup = renderToString(
    sheet.collectStyles(
      <RemixServer context={remixContext} url={request.url} />,
    ),
  );
  const styles = sheet.getStyleTags();

  markup = markup.replace('__STYLES__', styles);
  responseHeaders.set('Content-Security-Policy', "script-src 'unsafe-inline' 'self';");
  responseHeaders.set('X-Frame-Options', 'SAMEORIGIN');
  responseHeaders.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  responseHeaders.set('X-Content-Type-Options', 'nosniff');
  responseHeaders.set('Content-Type', 'text/html');

  return new Response(`<!DOCTYPE html>${markup}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
