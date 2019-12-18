const environment_development = {
  oneM2M_subscriptionTag: '/ram?ct=json',
  oneM2M_subscriptionListenerTag:'/oneM2M/req/+/ram/#',
  oneM2M_subscriptionServer: 'mqtt://203.253.128.164:1883',

  wdc_serverIP:'http://125.138.177.86:7599/wdc_base/'
};

const environment_production = {
  dc_baseUrl: '',
  dc_subscriptionServer:'',
  dc_subscription: '',
  orion_postData:''
};


if (process.env.NODE_ENV && process.env.NODE_ENV === 'production')
  module.exports = environment_production;
else
  module.exports = environment_development;