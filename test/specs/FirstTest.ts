import * as assert from "assert";

//  npx wdio run test/wdio.conf.ts

describe("WEBDRIVER IO", () => {
  it("URL", async () => {
    console.log("Session id is" + browser.sessionId);
    console.log("Capablities" + browser.capabilities);
    browser.url("https://webdriver.io/");
    await expect(browser).toHaveUrl("https://webdriver.io/");
    await expect(browser).toHaveUrlContaining("webdriver");
  });
  it("IS DISPLAYED", async () => {
    browser.url("https://webdriver.io/");
    const roboImg = await $(".hero__title");
    await expect(roboImg).toBeDisplayed();
  });
  it("IS EXISITING", async () => {
    browser.url("https://webdriver.io/");
    const logo_slider = await $(".logos_rWPy");
    await expect(logo_slider).toExist();
  });
  it("TITLE", async () => {
    browser.url("https://webdriver.io/");
    await expect(browser).toHaveTitle(
      "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO"
    );
    expect(browser).toHaveTitleContaining("mobile");
  });
  it("FOCUSED ELEMENT", async () => {
    const navbar = await $(".navbar__inner");
    await expect(navbar).not.toBeFocused();
  });
  it("has some attribute", async () => {
    const highlightSection = await $(".highlightSection");
    await expect(highlightSection).toHaveAttr(
      "class",
      "highlightSection darkSection_dAst darkSection"
    );
    await expect(highlightSection).toHaveAttrContaining("class", "highlight");
  });
  it("has this companyUsage_Q4u4 class name", async () => {
    const randomSection = await $(".companyUsage_Q4u4");
    await expect(randomSection).toHaveElementClass("companyUsage_Q4u4", {
      message: "it has this class",
    });
  });
  it("has some width adn height property", async () => {
    const feature_title = await $(".companyUsage_Q4u4");
    // await expect(feature_title).toHaveElementProperty("width", "100%");
  });
  it("is clickable", async () => {
    const twitterBtn = await $$(".tweetBtn_VL1H");
    await expect(twitterBtn).toBeClickable();
  });
});
describe("orange hrm ", () => {
  it("should login", async () => {
    browser.url("https://opensource-demo.orangehrmlive.com/");
    await browser.maximizeWindow();
    const username = await $("#txtUsername");
    await username.setValue("praveen");
    await browser.pause(2000);
    await username.clearValue();
    await browser.pause(2000);
    await username.setValue("balendra");
    const finalValue = await username.getValue();
    console.log(finalValue);
  });
  it("should clickable", async () => {
    const login_btn = await $("#btnLogin");
    await expect(login_btn).not.toBeDisabled();
    await expect(login_btn).toBeClickable();
    await browser.pause(2000);
    await expect(login_btn).toBeEnabled();
    await expect(login_btn).toBeClickable();
    const getValueOfbtn = await login_btn.getAttribute("value");
    console.log("attribut value of login btn", +getValueOfbtn);
    const cssfontsizeofbtn = await login_btn.getCSSProperty("font-size");
    console.log("font size of login btn", +cssfontsizeofbtn);
    const forgotpasslink = await $(
      "//a[contains(@href,'requestPasswordResetCode')]"
    );
    const forgotpasstext = await forgotpasslink.getText();
    console.log("forgot pass text value ", +forgotpasstext);
    expect(forgotpasstext).toHaveValueContaining("Forgot");
  });
});
describe("use of $$", async () => {
  it("find all social icons", async () => {
    browser.url("https://opensource-demo.orangehrmlive.com/");
    const allsocialicons = await $$('//div[@id="social-icons"]//img');
    console.log(allsocialicons.length);
    assert.strictEqual(allsocialicons.length, 4, "count mismatched");
    for (let i = 1; i <= allsocialicons.length; i++) {
      //   const altofimages = allsocialicons[i].getAttribute("alt");
      console.log("altofimages");
    }
  });
});

describe("dropdowns test", () => {
  it("select dob values of fields", async () => {
    browser.url("https://www.facebook.com/");
    const createnewaccount = await $('//a[text()="Create New Account"]');
    await createnewaccount.click();
    const monthDD = await $("#month");
    const dayDD = await $("#day");
    const dayvalue = await dayDD.selectByIndex(2);
    await monthDD.selectByAttribute("value", 12);
    const selectedvalue = await monthDD.getValue();
    const selecteddayvalue = await dayDD.getValue();
    console.log("selectedvalue", selectedvalue);
    console.log("selecteddayvalue", selecteddayvalue);
    assert.strictEqual(selectedvalue, "12");
    assert.strictEqual(selecteddayvalue, "3");
  });
});

//it may have some error in your case please refer to the auto suggestions testing in web driver io
// describe("autosuggestions testing of google search", () => {
//   test("google", async () => {
//     await browser.url("https://www.google.com/");
//     const search = await $('//input[@name="balendra"]');
//     await search.setValue("Balendra kumar");
//     await browser.pause(2000);
//     const suggestions = await $$(
//       '//ul[@role="list-box"]//li//div[@role="option"]'
//     );
//     for (let i = 0; i <= suggestions.length; i++) {
//       console.log("values from suggestions");
//     }
//   });
// });
describe("Dynamic wait for displayed", () => {
  it("wait for the text", async () => {
    await browser.url("https://the-internet.herokuapp.com/dynamic_loading/1");
    await browser.maximizeWindow();
    const start_btn = await $('//button[text()="Start"]');
    await start_btn.click();
    const getText = await $('//h4[text()="Hello World!"]');
    await getText.waitForDisplayed();
    assert.strictEqual(await getText.isDisplayed(), true);
  });
});

describe("Dynamic wait for enabled", () => {
  it("wait for the text", async () => {
    await browser.url("https://the-internet.herokuapp.com/dynamic_controls");
    browser.maximizeWindow();
    const input = await $('//input[@type="text"]');
    const enablerBtn = await $('//button[text()="Enable"]');
    await enablerBtn.click();
    await input.waitForEnabled();
    await input.setValue("praveen");
    assert.strictEqual(await input.getValue(), "praveen");
    console.log("the text is logged", await input.getText());
  });
});

describe("wait until", () => {
  it("wait for text example", async () => {
    await browser.url(
      "http://seleniumpractise.blogspot.com/2016/08/how-to-use-explicit-wait-in-selenium.html"
    );
    const clickBtn = await $('//button[text()="Click me to start timer"]');
    await clickBtn.click();
    const thevaluetobedisplayed = $('//p[@id="demo"]');
    await (
      await thevaluetobedisplayed
    ).waitUntil(
      async function randomfn() {
        return (await this.getText()) === "WebDriver";
      },
      { timeout: 20000, timeoutMsg: "text is not getting displayed" }
    );
  });
});

describe("hadling the alert", () => {
  it("test the alert and the value we are getting", async () => {
    await browser.url(
      "https://webmail.rediffmailpro.com/action/login/rediff-inc.com"
    );
    const gobtn = await $("//button");
    await gobtn.click();
    const alertValue = await browser.getAlertText();
    await browser.acceptAlert();
    await assert.strictEqual(
      alertValue,
      "Please enter the Username and Password."
    );
  });
});

describe("switch windows", () => {
  it("switch to different tabs/windows", async () => {
    await browser.url("https://opensource-demo.orangehrmlive.com/");
    const linkedinbtn = await $("//img[@alt='LinkedIn OrangeHRM group']");
    await linkedinbtn.click();
    await browser.switchWindow("linkedin.com");
    const inputlinkedinusername = await $(
      '//input[@placeholder="Email or phone number"]'
    );
    (await inputlinkedinusername).setValue("praveen");
    await browser.pause(2000);
    await browser.switchWindow("orangehrm");
    const inputornagehrmusername = await $('//input[@name="txtUsername"]');
    await inputornagehrmusername.setValue("yadav");
    await browser.pause(2000);
    await browser.closeWindow();
  });
});
