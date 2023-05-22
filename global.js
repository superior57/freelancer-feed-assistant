const notify = (message) => {
  if (window.Notification && Notification.permission === "granted") {
    new Notification(message);
  } else if (window.Notification && Notification.permission !== "denied") {
    Notification.requestPermission(function (status) {
      if (status === "granted") {
        new Notification(message);
      } else {
        alert("You have denied notifications.");
      }
    });
  } else {
    alert("Desktop notifications not available.");
  }
};

const createBid = async function (project) {
  try {
    const resume = `I am a highly skilled and experienced web developer with 10 years of expertise in front-end and back-end development seeking a challenging position in a dynamic and innovative organization. \n rofessional Summary: - With several years of professional experience in web development - Deep background in coding/ testing/debugging web applications - Keen eye for detail and am skilled in using various programming languages, frameworks, and tools - Possess excellent communication skills and thrive in a collaborative environment \n Proficient Technologies - Pro-Lang: HTML, JavaScript, TypeScript, Python, PHP - Frontend: React, Next.js, Angular, Vue, Gatsby, React Native, Redux - Backend: Node, Express, Django, Laravel - UI-Library: Material UI(MUI), Bootstrap, Tailwind CSS, Styled-Components, Chakra UI, Ant Design - DB: MongoDB, MySQL, PostgreSQL, SQLite - Testing: Jest, Mocha, Cypress - Other: Git, AWS, Google Cloud Platform(GCP), Firebase, Elasticsearch, Twilio, Bandwidth, QuickBooks, PayPal, Stripe, ... Driven by a results-oriented approach and a keen eye for detail - With excellent project management and collaboration skills - Committed to delivering exceptional results on time and with budget.`;

    // const corsUrl = "https://cors-anywhere.herokuapp.com/";

    const data = {
      name: authUser.public_name,
      clientName: project.owner_info.public_name,
      resume,
      description: `${project.title}: ${project.description}`,
    };

    const responseProposal = await axios.post(
      `https://owrswbqcqmucfys6yzedndj6xy0rqygz.lambda-url.us-west-1.on.aws/`,
      data
    );

    const { message } = responseProposal.data;

    // const responseBid = await axios.post(
    //   "https://www.freelancer.com/api/projects/0.1/bids/",
    //   {
    //     project_id: project.id,
    //     bidder_id: authUser.id,
    //     amount: project.budget.maximum,
    //     period: project.bidperiod,
    //     milestone_percentage: 100,
    //     description: message,
    //   },
    //   {
    //     headers: {
    //       "content-type": "application/json",
    //       "freelancer-oauth-v1": "<oauth_access_token>",
    //     },
    //   }
    // );

    // return responseBid.data;

    return responseProposal.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const getSearchInfo = () =>
  new Promise((resolve) => {
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

      resolve(searchInfo);
    });
  });

const $Async = (selector, callback, retry = 5) => {
  if (retry === 0) {
    const error = new Error("Can not load Element");
    throw error;
  }

  var $el = $(selector);
  if ($el.length === 0) {
    retry = retry - 1;
    setTimeout(() => $Async(selector, callback, retry), 500); // Retry every 500ms
    return;
  }

  callback($el);
};

