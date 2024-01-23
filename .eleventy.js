module.exports = function(eleventyConfig) {

  const moment = require("moment");
  const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

  //11ty PassthroughCopy
  eleventyConfig.addPassthroughCopy("./src/js/main-min.js");
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/style.css");
  eleventyConfig.addPassthroughCopy("./src/admin");
  
  //11ty Navigation Plugin
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // A responsive image helper using Netlify Large Media - image transformation
  eleventyConfig.addShortcode("picture", require("./src/js/picture.js"));


  // date filter (localized)
  eleventyConfig.addNunjucksFilter("date", function (date, format, locale) {
    locale = locale ? locale : "en";
    moment.locale(locale);
    return moment(date).format(format);
  });

  //©copyrights year output
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  //Netlify CMS Ignore Folder
  eleventyConfig.ignores.add("./src/admin");

  // You can return your Config object (optional).
  return {
    dir: {
      input: "src",
      output: "dist",
      data: "_data"
    }
  };

};
