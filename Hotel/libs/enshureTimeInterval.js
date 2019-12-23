module.exports = function (start1,end1,start2,end2){
    return ( Math.max(0, Math.min(end2, end1) - Math.max(start1, start2) + 1) ) >= 0;
};