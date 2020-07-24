import http from './http';
import { noInteractionWait } from '../utils/noInteractionWait';


const fs = require('fs');
const originalPollingTimelineData = require('../support_files/stubData/footballMockData/pollingData/footballPollingSuccess.json');
const rawdata = require('../support_files/stubData/footballMockData/pollingData/footballPollingTimeline.json');
const footballPollingTimelinePath = `${process.cwd()}/test/e2e/support_files/stubData/footballMockData/pollingData/footballPollingTimeline.json`;


export async function replaceJsonNewEvent() {

    const htlMainScreen = HTLMainScreen.getInstance();
    // update json
    const url = 'http://localhost:7878/admin/setMock?verb=get&serviceUrl=footballPollingTimeline&mockFile=footballPollingNewEvent1.json';
    await http.fetchJson(url, 'JSON');

    await utils.waitPromise(htlMainScreen.getPollingInterval());
}

export async function startPolling(){

    
       // get initial polling data
       const initialPollingData = originalPollingTimelineData;
       // get pollingInterval value
        const htlMainScreen = HTLMainScreen.getInstance();
        const pollingInterval:number = htlMainScreen.getPollingInterval();
   
       // reset pollingfile data to Original
       const initialPollingDataJson = JSON.stringify(initialPollingData);
       

       fs.writeFile(footballPollingTimelinePath, initialPollingDataJson, (err: string) => {
           if (err) throw err;
           console.log('Initial polling data written to file');
       });
       
       console.log('This is after the write call - Initial polling data');

       for (let i = 0; i < 6; i++) {
        await addNewFootballEvent(i);
        await noInteractionWait(pollingInterval);
      }

       // reset pollingfile data to Original
       fs.writeFile(footballPollingTimelinePath, initialPollingDataJson, (err: string) => {
           if (err) throw err;
           console.log('Reset the Polling Data written to file');
       });      

}

async function addNewFootballEvent(i:number){

    // read pollingTimeLine data file
    

    
    console.log("RAWDATA: ", rawdata);

    // generate dynamic data
    const count = i;
    const eventType = ["Shot", "Missed Shot", "Goal"];
    const teamID = ["4460929109807135168","5014162150526798168"];
    const teamLogo = ["6559085583478933119","7942295673224225119"];
    const playerName = ["Onel Hernández", "Pierre-Emile Højbjerg"];

    const randomeventType = eventType[Math.floor(Math.random() * eventType.length)];
    const randomTeam = Math.floor(Math.random() * teamID.length);
    const updatedtimetext = `${10 + i}'`;

    const lastEventNumber = rawdata.timeline.length - 1;
    const lastgametimeSeconds = rawdata.timeline[lastEventNumber].gametimeSeconds + 10;
    let gametimeSegment = 1;

    if (count > 3) {
        gametimeSegment = 2;
    }

    // create new timeline object to append
    let newTimeLineEvent = {
        type: randomeventType,
        gametimeSeconds: lastgametimeSeconds,
        gametimeSegment: gametimeSegment,
        video: {
            uri: "https://video.spex.aidisco.sky.com/out/v1/e10d3e627ec246c8a594e5f8c6ba902d/9863fbef68da4d3b916840113f0d06f6/bb5e8ada38d44683bd3d06249ecc23fc/index.m3u8",
            format: "HLS",
            startPos: 18000,
            endPos: 38000,
            startTime: "2020-06-19T17:01:47.000Z",
            endTime: "2020-06-19T17:02:02.000Z"
        },
        display: {
            title: randomeventType,
            shortTitle: randomeventType,
            timetext: updatedtimetext,
            shorttext: `${playerName[randomTeam]}`,
            description: "Saved Shot on Goal by Timm Klose assisted by Kenny McLean",
            teamId: `http://sportsdataservice.merlin.ccp.xcal.tv:10119/sportsDataService/data/Team/${teamID[randomTeam]}`,
            logo: `http://localhost:7878/footballMockData/assets/${teamLogo[randomTeam]}.png`,
            scoretext: "1"
        },
        periodSetId: "0"
    }

    // push new timeline object 

    rawdata.timeline.push(newTimeLineEvent);
    const json = JSON.stringify(rawdata); //convert it back to json

    fs.writeFile(footballPollingTimelinePath, json, (err: string) => {
        if (err) throw err;
        console.log('Polling Data written to file');
    });
    console.log('This is after the write call - polling data ');

}


async function addNewCricketEvent(i:number){

    // read pollingTimeLine data file
    

    
    console.log("RAWDATA: ", rawdata);

    // generate dynamic data
    const count = i;
    const eventType = ["4", "6", "50", "Wicket", "100", "150"];
    const teamID = ["8140617329174229168","685066325710530168"];
    const teamLogo = ["5507022326520019119","8745891351236408119"];
    const playerName = ["Stokes", "Pierre-Emile Højbjerg"];

    const randomeventType = eventType[Math.floor(Math.random() * eventType.length)];
    const randomTeam = Math.floor(Math.random() * teamID.length);
    const updatedtimetext = `${10 + i}'`;

    const lastEventNumber = rawdata.timeline.length - 1;
    const lastgametimeSeconds = rawdata.timeline[lastEventNumber].gametimeSeconds + 10;
    let gametimeSegment = 1;

    if (count > 3) {
        gametimeSegment = 2;
    }

    // create new timeline object to append
    let newTimeLineEvent = {
        type: randomeventType,
        gametimeSeconds: lastgametimeSeconds,
        gametimeSegment: gametimeSegment,
        video: {
            uri: "https://video.spex.aidisco.sky.com/out/v1/e10d3e627ec246c8a594e5f8c6ba902d/9863fbef68da4d3b916840113f0d06f6/bb5e8ada38d44683bd3d06249ecc23fc/index.m3u8",
            format: "HLS",
            startPos: 18000,
            endPos: 38000,
            startTime: "2020-06-19T17:01:47.000Z",
            endTime: "2020-06-19T17:02:02.000Z"
        },
        display: {
            title: randomeventType,
            shortTitle: randomeventType,
            timetext: updatedtimetext,
            shorttext: `${playerName[randomTeam]}`,
            description: "Saved Shot on Goal by Timm Klose assisted by Kenny McLean",
            teamId: `http://sportsdataservice.merlin.ccp.xcal.tv:10119/sportsDataService/data/Team/${teamID[randomTeam]}`,
            logo: `http://localhost:7878/footballMockData/assets/${teamLogo[randomTeam]}.png`,
            scoretext: "1"
        },
        periodSetId: "0"
    }

    // push new timeline object 

    rawdata.timeline.push(newTimeLineEvent);
    const json = JSON.stringify(rawdata); //convert it back to json

    fs.writeFile(footballPollingTimelinePath, json, (err: string) => {
        if (err) throw err;
        console.log('Polling Data written to file');
    });
    console.log('This is after the write call - polling data ');

}

