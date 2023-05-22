const initialize = () => {
  getSearchInfo().then((data) => {
    console.log(data);
    Object.entries(data).forEach(([key, value]) => {
      $(`*[name="${key}"]`).val(value);
    });
  });
};

$(document).ready(function () {
  initialize();

  $("#btn_save").on("click", () => {
    chrome.storage.sync.set({
      openai_api_key: $('input[name="openai_api_key"]').val(),
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
