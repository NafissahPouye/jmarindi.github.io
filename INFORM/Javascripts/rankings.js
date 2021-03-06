regions = ["GLOBE", "AFRICA", "AMEE", "LAC", "US & Canada"];

rankings = {
  "GLOBE": []//,
  // "AFRICA": [],
  // "AMEE": [],
  // "LAC": [],
  // "US & Canada": []
};

function ordinalSuffixOf(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "<sup>st</sup>";
    }
    if (j == 2 && k != 12) {
        return i + "<sup>nd</sup>";
    }
    if (j == 3 && k != 13) {
        return i + "<sup>rd</sup>";
    }
    return i + "<sup>th</sup>";
}

function populateRankings(riskArray) {

  countriesData.features.map(function(feature) {
    var riskLevelObject = riskArray[findIndex(riskArray, "ISO3", feature.properties.ISO3)];
    if (riskLevelObject) {
      rankings["GLOBE"].push(riskLevelObject.COUNTRY);
      //rankings[feature.properties.AmCrossRegion].push(riskLevelObject.COUNTRY);
    }
  });

}

// Returns index of an attribute with a certain value within an array
var findIndex = function(array, attr, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i][attr] === value) {
            return i;
        }
    }
}

// grab value of the selected metric given country code
function getValue(riskArray, field, key) {
  if (findIndex(riskArray, field, key) >= 0) {
    return riskArray[findIndex(riskArray, field, key)][selectedMetric]; }
  else {
    return undefined;
  }
}

function rank(riskArray) {

  rankings = {
    "GLOBE": []//,
    // "AFRICA": [],
    // "AMEE": [],
    // "LAC": [],
    // "US & Canada": []
  };

  populateRankings(riskArray);

  rankings['GLOBE'].sort(function(a,b) {

    aValue = parseFloat(getValue(riskArray, "COUNTRY", a));
    if(aValue == undefined) aValue = 0;

    bValue = parseFloat(getValue(riskArray, "COUNTRY", b));
    if(bValue == undefined) bValue = 0;

    return d3.descending(aValue, bValue);
  });

  var alpha = rankings['GLOBE'].sort(function(a,b) { return d3.ascending(a,b) });

  // alpha.map(function(d,i) {
  //   console.log((i+2), d);
  // })

}

function getISO3(riskArray, nameOfCountry) {
  if (findIndex(riskArray, "COUNTRY", nameOfCountry)) {
    return riskArray[findIndex(riskArray, "COUNTRY", nameOfCountry)]["ISO3"]; }
  else {
    return undefined;
  }
}

function findRank(country) {

  var result = { /*amCrossRegion : "", REGION: "", */GLOBE: "" };
  result.GLOBE = ordinalSuffixOf(rankings.GLOBE.indexOf(country) + 1);
  // for (var i = 1; i < 5; i++) {
  //   if (rankings[regions[i]].indexOf(country) >= 0) { result.amCrossRegion = regions[i] }
  // }
  // result.REGION = ordinalSuffixOf(rankings[result.amCrossRegion].indexOf(country) + 1);
  return result;

}
