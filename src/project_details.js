"use strict";

$(document).ready(function () {
  $Async(".BidHeader > fl-bit", function ($el) {
    $el.empty();
    $el.append(
      `<app-bid-description-button _ngcontent-webapp-c313="" _nghost-webapp-c301="" class="ng-star-inserted">
      <fl-button class="bidButton" _ngcontent-webapp-c301="" fltrackinglabel="AiGeneratedBid" class="AIButton" _nghost-webapp-c103="" data-color="primary" data-display="flex">
        <button _ngcontent-webapp-c103="" tabindex="0" aria-live="assertive" class="ButtonElement ng-star-inserted" type="button" data-color="primary" data-display="flex">
          <fl-bit _ngcontent-webapp-c301="" class="WriteMyBid ng-star-inserted" _nghost-webapp-c94="">
            <fl-icon _ngcontent-webapp-c301="" _nghost-webapp-c98="" data-backdrop-style="solid" data-size="mid" role="img" data-use-icon-font="false" data-fill-icon-font="false" data-margin-right="xxxsmall">
              <div _ngcontent-webapp-c98="" class="IconInner">
              <div _ngcontent-webapp-c98="" class="IconContainer" data-color="inherit" data-drop-shadow="false" data-name="ui-magic-bird-freelancer-logo" data-size="mid" aria-hidden="true">
              <svg width="100%" height="100%" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
              <g clip-path="url(#a)">
              <g fill-rule="evenodd" clip-rule="evenodd">
              <path d="m14.517 5 1.458 2.052L23.348 5h-8.83Zm-7.66 15.974 3.988-3.914-2.4-2.586-1.588 6.5ZM13.914 5l-2.132 1.93 3.585.134L13.913 5ZM5.626 5l.766 1.575 4.22.264L5.625 5Zm2.26 8.168 3.116-5.838-9.053-.49 5.936 6.328Zm.362.37 2.945 3.176 3.248-3.197 1.008-5.953-3.958-.203M19 12l-.583-1.375L17 10l1.417-.625L19 8l.672 1.375L21 10l-1.328.625L19 12Zm0-1 .266-.706L20 10l-.734-.294L19 9l-.25.706L18 10l.75.294L19 11ZM2 17l-.583-1.375L0 15l1.417-.625L2 13l.672 1.375L4 15l-1.328.625L2 17Zm0-1 .266-.706L3 15l-.734-.294L2 14l-.25.706L1 15l.75.294L2 16ZM5 18l-.348-.691L4 17l.652-.316L5 16l.332.684L6 17l-.668.309L5 18ZM5 14l-.348-.691L4 13l.652-.316L5 12l.332.684L6 13l-.668.309L5 14Z">
              </path>
              </g>
              <clipPath id="a">
              <rect width="24" height="24" fill-rule="evenodd" rx="0" ry="0">
              </rect>
              </clipPath></g></svg>
              </div>
              </div>
            </fl-icon>
            <fl-bit _ngcontent-webapp-c301="" _nghost-webapp-c94=""> Write my bid </fl-bit>
          </fl-bit>
        </button>
        </fl-button>
        </app-bid-description-button>`
    );

    const $image = $("<img>");
    $image.attr("src", "//v.fastcdn.co/u/430e104e/57723912-0-Untitled-22.svg");
    $image.attr("width", "50");
    $image.attr("height", "50");
    $image.hide();

    $el.append($image);

    $(".bidButton").on("click", () => {
      const allPath = document.location.pathname.split("/");
      if (document.location.pathname.match(/^(\/projects\/)([a-z]){2}/)) {
        let projectPath = [allPath[2], allPath[3]].join("/");
        console.log("starting bid...");
        $(".bidButton").hide();
        $image.show();

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

            details.owner_info = owner_info;
            const bid = await createBid(details);

            $("#descriptionTextArea").val(bid.message);
            $("#descriptionTextArea").click();
            $("#descriptionTextArea").attr(
              "class",
              "TextArea ng-tns-c243-47 ng-trigger ng-trigger-shakeAnimation ng-touched ng-dirty ng-valid"
            );

            $(".bidButton").show();
            $image.hide();
          })
          .catch((error) => {
            $(".bidButton").show();
            $image.hide();
            console.log(error);
          });
      }
    });
  });
});
