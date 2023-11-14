import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js';

const LastUpdated = () => {
    
    const lastUpdated = useSelector<RootState>(state => state.espn.lastUpdated) as Date;
    const locale = function(number, index, totalSec) {
        // number: the time ago / time in number;
        // index: the index of array below;
        // totalSec: total seconds between date to be formatted and today's date;
        return [
          //['just now', 'right now'],
          ['this minute', 'in %s seconds'],
          ['this minute', 'in %s seconds'],
          ['1 minute ago', 'in 1 minute'],
          ['%s minutes ago', 'in %s minutes'],
          ['1 hour ago', 'in 1 hour'],
          ['%s hours ago', 'in %s hours'],
          ['1 day ago', 'in 1 day'],
          ['%s days ago', 'in %s days'],
          ['1 week ago', 'in 1 week'],
          ['%s weeks ago', 'in %s weeks'],
          ['1 month ago', 'in 1 month'],
          ['%s months ago', 'in %s months'],
          ['1 year ago', 'in 1 year'],
          ['%s years ago', 'in %s years']
        ][index];
      };
      timeago.register('stinkyApartment', locale as any);


    return (
        <div style={{color: '#DDD', marginTop: '1em'}}>
            Last updated: <TimeAgo datetime={lastUpdated} locale='stinkyApartment'/>
        </div>
        
    )
}

export default LastUpdated;