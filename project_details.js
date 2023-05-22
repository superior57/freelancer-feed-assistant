$(document).ready(function () {
  const allPath = document.location.pathname.split("/");
  if (document.location.pathname.match(/^(\/projects\/)([a-z]){2}/)) {
    let projectPath = [allPath[2], allPath[3]].join("/");
    console.log("starting bid...");
    console.log(projectPath);

    const $image = $("<img>");
    $image.attr("src", "//v.fastcdn.co/u/430e104e/57723912-0-Untitled-22.svg");
    $image.attr("width", "50");
    $image.attr("height", "50");

    $Async('label[for="descriptionTextArea"]', ($el) => {
      console.log($el);
      $el.parent().css("display", "flex");
      $el.parent().css("align-items", "center");

      axios
        .get("https://www.freelancer.com/api/projects/0.1/projects", {
          params: {
            limit: 1,
            attachment_details: true,
            full_description: true,
            job_details: true,
            location_details: true,
            nda_details: true,
            project_collaboration_details: true,
            seo_urls: [projectPath],
            selected_bids: true,
            qualification_details: true,
            upgrade_details: true,
            review_availability_details: true,
            local_details: true,
            equipment_details: true,
            invited_freelancer_details: true,
            client_engagement_details: true,
            contract_signature_details: true,
            enterprise_linked_projects_details: true,
            equipment_group_details: true,
            webapp: 1,
            compact: true,
            new_errors: true,
            new_pools: true,
          },
        })
        .then(async (response) => {
          const details = response.data?.result?.projects?.[0];

          const owner_info = await axios
            .get("https://www.freelancer.com/api/users/0.1/users", {
              params: {
                badge_details: true,
                country_details: true,
                display_info: true,
                employer_reputation: true,
                jobs: true,
                location_details: true,
                membership_details: true,
                preferred_details: true,
                qualification_details: true,
                responsiveness: true,
                reputation: true,
                sanction_details: true,
                status: true,
                users: [details.owner_id],
                profile_description: true,
                marketing_mobile_number: true,
                webapp: 1,
                compact: true,
                new_errors: true,
                new_pools: true,
              },
            })
            .then((res) => res.data?.result?.users?.[details.owner_id]);

          console.log(owner_info);

          details.owner_info = owner_info;
          const bid = await createBid(details);

          $("#descriptionTextArea").val(bid.message);
          $image.hide();
        })
        .catch((error) => {
          $image.hide();
          console.log(error);
        });
    });
  }
});
