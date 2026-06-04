const oFetch = window.fetch;

window.fetch = async (...args) => {
  const resp = await oFetch(...args);

  if (resp.url.includes("PersonalizedFeed")) {
    const text = await resp.text();
    const json = JSON.parse(text);
    json.data.me.personalizedFeed.feedItems = json.data.me.personalizedFeed.feedItems.filter(
      item => item.feedItemType !== "PROMO"
    );

    return new Response(JSON.stringify(json), {
      status: resp.status,
      statusText: resp.statusText,
      headers: resp.headers
    });
  }

  return resp;
};