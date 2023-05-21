const initialize = () => {
  chrome.storage.sync.get(null, (data) => {
    const searchInfo = {
      necessary_skills: data.necessary_skills?.split(",") || [
        "react.js",
        "next.js",
        "angular",
        "laravel",
        "node.js",
        "vue.js",
        "redux",
        "mui",
        "PHP",
      ],
      unnecessary_skills: data.unnecessary_skills?.split(",") || [
        "wordpress",
        "graphic design",
        "illustrator",
      ],
      remove_countries_code: data.remove_countries_code?.split(",") || [
        "IN",
        "NG",
        "PK",
      ],
      price_hourly_min: +(data.price_hourly_min || "5"),
      price_hourly_max: +(data.price_hourly_max || "15"),
      price_fix_min: +(data.price_fix_min || "100"),
      price_fix_max: +(data.price_fix_max || "200"),
    };

    Object.entries(searchInfo).forEach(([key, value]) => {
      $(`*[name="${key}"]`).val(value);
    });
  });
};

$(document).ready(function () {
  initialize();

  $("#btn_save").on("click", () => {
    chrome.storage.sync.set({
      necessary_skills: $('textarea[name="necessary_skills"]').val(),
      unnecessary_skills: $('textarea[name="unnecessary_skills"]').val(),
      remove_countries_code: $('textarea[name="remove_countries_code"]').val(),
      price_hourly_min: $('input[name="price_hourly_min"]').val(),
      price_hourly_max: $('input[name="price_hourly_max"]').val(),
      price_fix_min: $('input[name="price_fix_min"]').val(),
      price_fix_max: $('input[name="price_fix_max"]').val(),
    });

    window.close();
  });
});
