const GoodsService = () => {
  const _apiBase = "https://fakestoreapi.com/";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const getResource = async (property, i) => {
    try {
      const url = `${_apiBase}${property}/${i}`;
      const response = await fetch(url, options);
      if (!response.ok)
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  const getAllGoods = async () => {
    const goods = await getResource("products", "");
    return goods;
  };
  const getOneCatergory = async (name) => {
    const goods = await getResource("products/category", name);
    return goods;
  };
  const getOne = async (id) => {
    const goods = await getResource("products", id);
    return goods;
  };
  const getCategory = async (name) => {
    const goods = await getResource("products", `category/${name}`);
    return goods;
  };
  return { getAllGoods, getOne, getCategory, getOneCatergory };
};

export default GoodsService;
