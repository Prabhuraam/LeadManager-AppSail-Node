const catalyst = require('zcatalyst-sdk-node');
const express = require('express');
const axios = require('axios');
const http = require('https')
const app = express()
app.use(express.static('public'));
app.use(express.json());
const HOST = "www.zohoapis.com";
const AUTH_HOST = "https://accounts.zoho.com/oauth/v2/token";
const PORT = 443;
const CLIENTID = '1000.4P8NTL3C7I3W27WVAGW730BW1TEN2Z'; //Add your client ID
const CLIENT_SECRET = 'b67029409f075cb154ff9b8ec2c35b2fe8d7d6a048'; //Add your client secret


app.get("/generateToken", async (req, res) => {
  try {
    console.log("Entered generated token")
    const catalystApp = catalyst.initialize(req);
    const code = req.query.code;
	const domain = `${process.env.X_ZOHO_CATALYST_IS_LOCAL === 'true' ? "http" : "https"}://${process.env.X_ZOHO_CATALYST_IS_LOCAL === 'true' ? req.headers.host : req.headers.host.split(':')[0]}`
    let userManagement = catalystApp.userManagement();
    const refresh_token = await getRefreshToken(code, res, domain);
    let userDetails = await userManagement.getCurrentUser();
    const catalystTable = catalystApp.datastore().table("Token");
    const userId = userDetails.user_id;
    await catalystTable.insertRow({
      refresh_token,
      userId,
    });
    res.status(200).redirect(`${domain}/index.html`);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({
        message: "Internal Server Error. Please try again after sometime.",
        error: err,
      });
  }
});

app.get("/getUserDetails", async (req, res) => {
  try{
    const catalystApp = catalyst.initialize(req);
    const userDetails = await getUserDetails(catalystApp);
    if (userDetails.length !== 0) {
        console.log("user present")
      res.status(200).send({ userId: userDetails[0].Token.userId });
    } else {
        console.log("User not present")
        console
      res.status(200).send({ userId: null });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({
        message:
          "Internal Server Error in Getting User Details. Please try again after sometime.",
        error: err
      });
  }
});

app.get("/crmData", async (req, res) => {
  try {
    const catalystApp = catalyst.initialize(req);
    const userDetails = await getUserDetails(catalystApp);
    const accessToken = await getAccessToken(catalystApp, userDetails);
    const options = {
      hostname: HOST,
      port: PORT,
      method: "GET",
      path: `/crm/v2/Leads`,
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
      },
    };
    var data = "";
    const request = http.request(options, function (response) {
      response.on("data", function (chunk) {
        data += chunk;
      });

      response.on("end", function () {
        res.setHeader("content-type", "application/json");
        res.status(200).send(data);
      });
    });
    request.end();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({
        message: "Internal Server Error. Please try again after sometime.",
      });
  }
});

app.get("/crmData/:id", async (req, res) => {
  try {
    const catalystApp = catalyst.initialize(req);
    const userDetails = await getUserDetails(catalystApp);
    const accessToken = await getAccessToken(catalystApp, userDetails);
    const options = {
      hostname: HOST,
      port: PORT,
      method: "GET",
      path: `/crm/v2/Leads/${req.params.id}`,
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
      },
    };
    var data = "";
    const request = http.request(options, function (response) {
      response.on("data", function (chunk) {
        data += chunk;
      });

      response.on("end", function () {
        res.setHeader("content-type", "application/json");
        res.status(200).send(data);
      });
    });
    request.end();
  } catch (err) {
    console.error(err);
    res.status(500).send({
        message: "Internal Server Error. Please try again after sometime.",
      });
  }
});

app.post("/crmData", async (req, res) => {
  try {
    const catalystApp = catalyst.initialize(req);
    const createData = req.body;

    const reqData = [];
    reqData.push(createData);
    const data = {
      data: reqData,
    };
    if (!createData) {
      res.status(400).send({ message: "Data Not Found" });
    }
    const userDetails = await getUserDetails(catalystApp);
    const accessToken = await getAccessToken(catalystApp, userDetails);
    const options = {
      hostname: HOST,
      port: PORT,
      method: "POST",
      path: `/crm/v2/Leads`,
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const request = http.request(options, function (response) {
        res.setHeader("content-type", "application/json");
        let responseData = '';
        response.on('data', (chunk) => {
          responseData += chunk;
        });
        response.on('end', () => {
          console.log('Response from the external request:', responseData); 
        });
        response.pipe(res);
      });
      
      request.write(JSON.stringify(data));
      request.end();
  } catch (err) {
    console.error(err);
    res.status(500).send({
        message: "Internal Server Error. Please try again after sometime.",
      });
  }
});

app.put("/crmData/:id", async (req, res) => {
  try {
    const catalystApp = catalyst.initialize(req);
    const updateData = req.body;
    const reqData = [];
    reqData.push(updateData);
    const data = {
      data: reqData,
    };
    if (!updateData) {
      res.status(400).send({ message: "Update Data Not Found" });
    }
    const userDetails = await getUserDetails(catalystApp);
    const accessToken = await getAccessToken(catalystApp, userDetails);
    const options = {
      hostname: HOST,
      port: PORT,
      method: "PUT",
      path: `/crm/v2/Leads/${req.params.id}`,
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const request = http.request(options, function (response) {
      res.setHeader("content-type", "application/json");
      response.pipe(res);
    });
    request.write(JSON.stringify(data));
    request.end();
  } catch (err) {
    console.error(err);
    res.status(500).send({
        message: "Internal Server Error. Please try again after sometime.",
      });
  }
});

app.delete("/crmData/:id", async (req, res) => {
  try {
    const catalystApp = catalyst.initialize(req);
    const userDetails = await getUserDetails(catalystApp);
    const accessToken = await getAccessToken(catalystApp, userDetails);
    const options = {
      hostname: HOST,
      port: PORT,
      method: "DELETE",
      path: `/crm/v2/Leads/${req.params.id}`,
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const request = http.request(options, function (response) {
      res.setHeader("content-type", "application/json");
      response.pipe(res);
    });
    request.end();
  } catch (err) {
    console.error(err);
    res.status(500).send({
        message: "Internal Server Error. Please try again after sometime.",
      });
  }
});

app.get("/getAccessToken",async (req, res)=>{
  try{
    const catalystApp = catalyst.initialize(req);
    const userDetails = await getUserDetails(catalystApp);
    const access_token = await getAccessToken(catalystApp, userDetails)
    res.send(access_token)
  }
  catch(err){
    console.error(err);
  }  
})

async function getAccessToken(catalystApp, userDetails) {
  const refresh_token = userDetails[0].Token.refresh_token;
  const userId = userDetails[0].Token.userId;
  const credentials = {
    [userId]: {
      client_id: CLIENTID,
      client_secret: CLIENT_SECRET,
      auth_url: AUTH_HOST,
      refresh_url: AUTH_HOST,
      refresh_token,
    },
  };
  const accessToken = await catalystApp.connection(credentials).getConnector(userId).getAccessToken();
  return accessToken;
}



async function getRefreshToken(code, res, domain) {
    try {
      const url = `${AUTH_HOST}?code=${code}&client_id=${CLIENTID}&client_secret=${CLIENT_SECRET}&grant_type=authorization_code&redirect_uri=${domain}/generateToken`;
      const response = await axios({
          method: "POST",
          url
        });
    console.log(response.data.refresh_token)
      return response.data.refresh_token;
    } catch (err) {
      console.log(err);
      res.status(500).send({
          message: "Internal Server Error. Please try again after sometime.",
          error: err,
        });
    }
  }

async function getUserDetails(catalystApp) {
  let userDetails = await catalystApp.userManagement().getCurrentUser();
  let userDetail = await catalystApp.zcql().executeZCQLQuery(`SELECT * FROM Token where UserId=${userDetails.user_id}`);
  return userDetail;
}


app.listen(process.env.X_ZOHO_CATALYST_LISTEN_PORT || 9000,()=>{
    console.log(`Listening from port ${process.env.X_ZOHO_CATALYST_LISTEN_PORT}!!!`)
})


module.exports = app;