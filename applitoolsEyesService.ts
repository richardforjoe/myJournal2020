import { enableVisualTest, applitoolsApiKey } from '../beforeAfterManager';
import { Console } from 'console';
const Eyes = require('@applitools/eyes-images').Eyes;
const screenshot = require('desktop-screenshot');
const fs = require('fs');

// Limitation: Hubble emulator doesn't have ability to launch in full screen
// Limitation: Free Eyes subscription is limited 100 checks per month per api key 

const fileTimeStamp = new Date();
const fileName = `${process.cwd()}/test/e2e/logs/logs-screenshot` +
                        `_${fileTimeStamp.getDate()}-${fileTimeStamp.getMonth()}-${fileTimeStamp.getFullYear()}_${fileTimeStamp.getHours()}-${fileTimeStamp.getMinutes()}`;
 let image: any;

 // Aplitools apikey - obtain from profile -> My Api key - Set this in beforeAfterManager
 const apiKey = applitoolsApiKey;
 
 // Match Levels: Strict - Human Eye, Exact - Pixel by pixel, Content - Ignores style, Layout - Structure
export enum MatchLevel {
    STRICT = "Strict",  
    EXACT = "Exact",
    CONTENT = "Content",
    LAYOUT = "Layout"
}

export async function runVisualValidation(TestId: string = "Test-run", matchLevel: MatchLevel = MatchLevel.STRICT ) {
    if (enableVisualTest){

          // take a desktop screenshot and save as image
    console.time("Eyes validation: Take Screenshot")
    await takeScreenshot(fileName); 
    console.timeEnd("Eyes validation: Take Screenshot");
    
    image = fs.readFileSync(`${fileName}.png`);
    // Initialize the eyes SDK and set your private API key & Level - strict is preferred. Exact|Strict|Content|Layout
    const eyes = new Eyes();
      eyes.setApiKey(apiKey);
      eyes.setMatchLevel(matchLevel);
      console.log("MATCHLEVEL: ", matchLevel);
  // Define the OS.
    eyes.setHostOS('Emulator')
    // eyes.setBatch('Highlights');
  
    // Visual validation.
console.time("Eyes validation: Eyes CheckImage")
      await eyes.open("image comparison", TestId, {width: 2880, height: 1800});
      await eyes.checkImage(image, TestId);
console.timeEnd("Eyes validation: Eyes CheckImage");

     // End the test. 
console.time("Eyes validation: Eyes Close")
      await eyes.close();
      await eyes.abort();
console.timeEnd("Eyes validation: Eyes Close"); 
    }
 console.log("SKIPPED VISUAL TEST")

  }


 // Screenshot 
async function takeScreenshot(fileName: string): Promise<any> {
    return new Promise((resolve, reject) => {
        screenshot(`${fileName}.png`, (error: any) => {
            if (error) {
                reject(new Error(`Screenshot failed ${error}`));
            }
            else {
                console.log('Screenshot succeeded');
                resolve();
            }
        });
    });
};
