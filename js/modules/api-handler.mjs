export const apiHandler = (() => {
   const endpoint = "https://restcountries.com/v2";

   const getAllCountries = async () => {
      return await apiCall(`${endpoint}/all`);
   };

   const getCountriesByRegion = async (region) => {
      const countries = await apiCall(`${endpoint}/all`);
      if (countries) return countries.filter((c) => c.region === region);
      return undefined;
   };

   const getCountryByName = async (countryName) => {
      const country = await apiCall(`${endpoint}/name/${countryName}`);
      return country;
   };

   const getCountryByCode = async (countryCode) => {
      const country = await apiCall(`${endpoint}/alpha/${countryCode}`);
      return country;
   };

   const apiCall = async (endpoint) => {
      return await fetch(`${endpoint}`)
         .then((res) => {
            if (!res.ok) {
               throw new Error(res.statusText);
            }
            return res;
         })
         .then(async (res) => {
            const data = await res.json();
            if (data.status && data.status >= 400) {
               throw new Error("Server returned a status code of " + data.status);
            }
            return data;
         })
         .catch((err) => console.log(err));
   };

   return {
      getAllCountries: getAllCountries,
      getCountryByName: getCountryByName,
      getCountriesByRegion: getCountriesByRegion,
      getCountryByCode: getCountryByCode,
   };
})();
