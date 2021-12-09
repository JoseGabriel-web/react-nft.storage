export function formatIpfsUrl(token) {
  return (
    "https://ipfs.io/ipfs/" +
    token.ipnft +
    "/image/" +
    token.data.name.replaceAll(" ", "%20")
  );
}


/**
 * 
 * {
 *    "name": "foto-test.jpg"
 *    "cid": "bafyreid4y5i6rkivi7n7f6tkqppvqukaap4c3zjc2yximoybihyvindqwm",    
 *    "url": "https://ipfs.io/ipfs/bafyreidzr3ke6fjzdf2p5jex22fb77w76rgpymr72gzohvo6zlxbke5ara/image/test-foto.jpeg",
 * }
 */