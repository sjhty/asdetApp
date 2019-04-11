let env = 'dev';

let base_url = '';

switch(env) {
    case 'dev':
        base_url = 'http://localhost:7001/asdet/api/';break;
    case 'pro':
        base_url = '';break;
    default:
        base_url = '';
}

export default base_url;