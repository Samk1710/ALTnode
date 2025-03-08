const url = 'https://api.corcel.io/v1/image/vision/text-to-image';
const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: 'dec2546c-3ed4-4d79-b6e1-33ee285fa71a'
  },
  body: JSON.stringify({
    cfg_scale: 2,
    height: '1024',
    width: '1024',
    steps: 8,
    engine: 'flux-schnell',
    text_prompts: [{text: '4 hedgehogs, wearing tuxedos, riding on the back of a crocodile.'}]
  })
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));