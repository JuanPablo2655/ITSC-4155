import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface SearchRequest {
	zipcode: string;
	category: string;
}

export const thirdPartyHome = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { zipcode, category } = req.body as SearchRequest;

		const payloads = [
			{
				operationName: 'GetModularFeed',
				variables: {
					debug: false,
					searchParams: [
						{ key: 'DISTANCE', value: '5' },
						{ key: 'platform', value: 'web_mobile' },
						{ key: 'zipcode', value: zipcode },
						{ key: 'experiment_id', value: 'experimentmodel24' },
						{ key: 'limit', value: '50' },
						{ key: 'searchSessionId', value: '52c93fc1-58fb-4545-83ad-59dd8bb18a62' },
						{ key: 'cid', value: '12.10' }, //office supplies
						// {key: "cid", value: "1.7"}//books, movies, entertainment
						// {key: "cid", value: "2.1"}//furniture
						// {key: "cid", value: "2.2"} //household needs
					],
				},
				query:
					'query GetModularFeed($searchParams: [SearchParam], $debug: Boolean = false) {\n  modularFeed(params: $searchParams, debug: $debug) {\n    analyticsData {\n      requestId\n      searchPerformedEventUniqueId\n      searchSessionId\n      __typename\n    }\n    categoryInfo {\n      categoryId\n      isForcedCategory\n      __typename\n    }\n    feedAdditions\n    filters {\n      ...modularFilterNumericRange\n      ...modularFilterSelectionList\n      __typename\n    }\n    legacyFeedOptions {\n      ...legacyFeedOptionListSelection\n      ...legacyFeedOptionNumericRange\n      __typename\n    }\n    looseTiles {\n      ...modularTileBanner\n      ...modularTileBingAd\n      ...modularTileGoogleDisplayAd\n      ...modularTileJob\n      ...modularTileEmptyState\n      ...modularTileListing\n      ...modularTileLocalDisplayAd\n      ...modularTileSearchAlert\n      ...modularTileSellerAd\n      ...modularModuleTileAdsPostXAd\n      __typename\n    }\n    modules {\n      ...modularGridModule\n      __typename\n    }\n    pageCursor\n    query {\n      ...modularQueryInfo\n      __typename\n    }\n    requestTimeMetadata {\n      resolverComputationTimeSeconds\n      serviceRequestTimeSeconds\n      totalResolverTimeSeconds\n      __typename\n    }\n    searchAlert {\n      alertId\n      alertStatus\n      __typename\n    }\n    debugInformation @include(if: $debug) {\n      rankedListings {\n        listingId\n        attributes {\n          key\n          value\n          __typename\n        }\n        __typename\n      }\n      lastViewedItems {\n        listingId\n        attributes {\n          key\n          value\n          __typename\n        }\n        __typename\n      }\n      categoryAffinities {\n        affinity\n        count\n        decay\n        affinityOwner\n        __typename\n      }\n      rankingStats {\n        key\n        value\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment modularFilterNumericRange on ModularFeedNumericRangeFilter {\n  isExpandedHighlight\n  lowerBound {\n    ...modularFilterNumericRangeBound\n    __typename\n  }\n  shortcutLabel\n  shortcutRank\n  subTitle\n  targetName\n  title\n  type\n  upperBound {\n    ...modularFilterNumericRangeBound\n    __typename\n  }\n  __typename\n}\n\nfragment modularFilterNumericRangeBound on ModularFeedNumericRangeFilterNumericRangeBound {\n  label\n  limit\n  placeholderText\n  targetName\n  value\n  __typename\n}\n\nfragment modularFilterSelectionList on ModularFeedSelectionListFilter {\n  targetName\n  title\n  subTitle\n  shortcutLabel\n  shortcutRank\n  type\n  isExpandedHighlight\n  options {\n    ...modularFilterSelectionListOption\n    __typename\n  }\n  __typename\n}\n\nfragment modularFilterSelectionListOption on ModularFeedSelectionListFilterOption {\n  isDefault\n  isSelected\n  label\n  subLabel\n  value\n  __typename\n}\n\nfragment legacyFeedOptionListSelection on FeedOptionListSelection {\n  label\n  labelShort\n  name\n  options {\n    default\n    label\n    labelShort\n    selected\n    subLabel\n    value\n    __typename\n  }\n  position\n  queryParam\n  type\n  __typename\n}\n\nfragment legacyFeedOptionNumericRange on FeedOptionNumericRange {\n  label\n  labelShort\n  leftQueryParam\n  lowerBound\n  name\n  options {\n    currentValue\n    label\n    textHint\n    __typename\n  }\n  position\n  rightQueryParam\n  type\n  units\n  upperBound\n  __typename\n}\n\nfragment modularTileBanner on ModularFeedTileBanner {\n  tileId\n  tileType\n  title\n  __typename\n}\n\nfragment modularTileBingAd on ModularFeedTileBingAd {\n  tileId\n  bingAd {\n    ouAdId\n    adExperimentId\n    adNetwork\n    adRequestId\n    adTileType\n    adSettings {\n      repeatClickRefractoryPeriodMillis\n      __typename\n    }\n    bingClientId\n    clickFeedbackUrl\n    clickReturnUrl\n    contentUrl\n    deepLinkEnabled\n    experimentDataHash\n    image {\n      height\n      url\n      width\n      __typename\n    }\n    impressionFeedbackUrl\n    impressionUrls\n    viewableImpressionUrls\n    installmentInfo {\n      amount\n      description\n      downPayment\n      __typename\n    }\n    itemName\n    lowPrice\n    price\n    searchId\n    sellerName\n    templateFields {\n      key\n      value\n      __typename\n    }\n    __typename\n  }\n  tileType\n  __typename\n}\n\nfragment modularTileGoogleDisplayAd on ModularFeedTileGoogleDisplayAd {\n  tileId\n  googleDisplayAd {\n    ouAdId\n    additionalSizes\n    adExperimentId\n    adHeight\n    adNetwork\n    adPage\n    adRequestId\n    adTileType\n    adWidth\n    adaptive\n    channel\n    clickFeedbackUrl\n    clientId\n    contentUrl\n    customTargeting {\n      key\n      values\n      __typename\n    }\n    displayAdType\n    errorDrawable {\n      actionPath\n      listImage {\n        height\n        url\n        width\n        __typename\n      }\n      __typename\n    }\n    experimentDataHash\n    formatIds\n    impressionFeedbackUrl\n    personalizationProperties {\n      key\n      values\n      __typename\n    }\n    prebidConfigs {\n      key\n      values {\n        timeout\n        tamSlotUUID\n        liftoffPlacementIDs\n        __typename\n      }\n      __typename\n    }\n    renderLocation\n    searchId\n    searchQuery\n    templateId\n    __typename\n  }\n  tileType\n  __typename\n}\n\nfragment modularTileJob on ModularFeedTileJob {\n  tileId\n  tileType\n  job {\n    address {\n      city\n      state\n      zipcode\n      __typename\n    }\n    companyName\n    datePosted\n    image {\n      height\n      url\n      width\n      __typename\n    }\n    industry\n    jobId\n    jobListingUrl\n    jobOwnerId\n    pills {\n      text\n      type\n      __typename\n    }\n    title\n    apply {\n      method\n      value\n      __typename\n    }\n    wageDisplayValue\n    provider\n    __typename\n  }\n  __typename\n}\n\nfragment modularTileEmptyState on ModularFeedTileEmptyState {\n  tileId\n  tileType\n  title\n  description\n  iconType\n  __typename\n}\n\nfragment modularTileListing on ModularFeedTileListing {\n  tileId\n  listing {\n    ...modularListing\n    __typename\n  }\n  tileType\n  __typename\n}\n\nfragment modularListing on ModularFeedListing {\n  listingId\n  conditionText\n  flags\n  image {\n    height\n    url\n    width\n    __typename\n  }\n  isFirmPrice\n  locationName\n  price\n  title\n  vehicleMiles\n  __typename\n}\n\nfragment modularTileLocalDisplayAd on ModularFeedTileLocalDisplayAd {\n  tileId\n  localDisplayAd {\n    ouAdId\n    adExperimentId\n    adNetwork\n    adRequestId\n    adTileType\n    advertiserId\n    businessName\n    callToAction\n    callToActionType\n    clickFeedbackUrl\n    contentUrl\n    experimentDataHash\n    headline\n    image {\n      height\n      url\n      width\n      __typename\n    }\n    impressionFeedbackUrl\n    searchId\n    __typename\n  }\n  tileType\n  __typename\n}\n\nfragment modularTileSearchAlert on ModularFeedTileSearchAlert {\n  tileId\n  tileType\n  title\n  __typename\n}\n\nfragment modularTileSellerAd on ModularFeedTileSellerAd {\n  tileId\n  listing {\n    ...modularListing\n    __typename\n  }\n  sellerAd {\n    ouAdId\n    adId\n    adExperimentId\n    adNetwork\n    adRequestId\n    adTileType\n    clickFeedbackUrl\n    experimentDataHash\n    impressionFeedbackUrl\n    searchId\n    __typename\n  }\n  tileType\n  __typename\n}\n\nfragment modularModuleTileAdsPostXAd on ModularFeedTileAdsPostXAd {\n  ...modularTileAdsPostXAd\n  moduleId\n  moduleRank\n  moduleType\n  __typename\n}\n\nfragment modularTileAdsPostXAd on ModularFeedTileAdsPostXAd {\n  tileId\n  adsPostXAd {\n    ouAdId\n    adExperimentId\n    adNetwork\n    adRequestId\n    adTileType\n    clickFeedbackUrl\n    experimentDataHash\n    impressionFeedbackUrl\n    searchId\n    offer {\n      beacons {\n        noThanksClick\n        close\n        __typename\n      }\n      title\n      description\n      clickUrl\n      image\n      pixel\n      ctaYes\n      ctaNo\n      __typename\n    }\n    __typename\n  }\n  tileType\n  __typename\n}\n\nfragment modularGridModule on ModularFeedModuleGrid {\n  moduleId\n  collection\n  formFactor\n  grid {\n    actionPath\n    tiles {\n      ...modularModuleTileBingAd\n      ...modularModuleTileGoogleDisplayAd\n      ...modularModuleTileListing\n      ...modularModuleTileLocalDisplayAd\n      ...modularModuleTileSellerAd\n      __typename\n    }\n    __typename\n  }\n  moduleType\n  rank\n  rowIndex\n  searchId\n  subTitle\n  title\n  infoActionPath\n  __typename\n}\n\nfragment modularModuleTileBingAd on ModularFeedTileBingAd {\n  ...modularTileBingAd\n  moduleId\n  moduleRank\n  moduleType\n  __typename\n}\n\nfragment modularModuleTileGoogleDisplayAd on ModularFeedTileGoogleDisplayAd {\n  ...modularTileGoogleDisplayAd\n  moduleId\n  moduleRank\n  moduleType\n  __typename\n}\n\nfragment modularModuleTileListing on ModularFeedTileListing {\n  ...modularTileListing\n  moduleId\n  moduleRank\n  moduleType\n  __typename\n}\n\nfragment modularModuleTileLocalDisplayAd on ModularFeedTileLocalDisplayAd {\n  ...modularTileLocalDisplayAd\n  moduleId\n  moduleRank\n  moduleType\n  __typename\n}\n\nfragment modularModuleTileSellerAd on ModularFeedTileSellerAd {\n  ...modularTileSellerAd\n  moduleId\n  moduleRank\n  moduleType\n  __typename\n}\n\nfragment modularQueryInfo on ModularFeedQueryInfo {\n  appliedQuery\n  decisionType\n  originalQuery\n  suggestedQuery\n  __typename\n}\n',
			},
			{
				operationName: 'GetModularFeed',
				variables: {
					debug: false,
					searchParams: [
						{ key: 'DISTANCE', value: '5' },
						{ key: 'platform', value: 'web_mobile' },
						{ key: 'zipcode', value: zipcode },
						{ key: 'experiment_id', value: 'experimentmodel24' },
						{ key: 'limit', value: '50' },
						{ key: 'searchSessionId', value: '52c93fc1-58fb-4545-83ad-59dd8bb18a62' },
						// {key: "cid", value: "12.10"}//office supplies
						// {key: "cid", value: "1.7"}//books, movies, entertainment
						{ key: 'cid', value: '2.1' }, //furniture
						// {key: "cid", value: "2.2"} //household needs
					],
				},
				query:
					'query GetModularFeed($searchParams: [SearchParam], $debug: Boolean = false) {\n  modularFeed(params: $searchParams, debug: $debug) {\n    analyticsData {\n      requestId\n      searchPerformedEventUniqueId\n      searchSessionId\n      __typename\n    }\n    categoryInfo {\n      categoryId\n      isForcedCategory\n      __typename\n    }\n    feedAdditions\n    filters {\n      ...modularFilterNumericRange\n      ...modularFilterSelectionList\n      __typename\n    }\n    legacyFeedOptions {\n      ...legacyFeedOptionListSelection\n      ...legacyFeedOptionNumericRange\n      __typename\n    }\n    looseTiles {\n      ...modularTileBanner\n      ...modularTileBingAd\n      ...modularTileGoogleDisplayAd\n      ...modularTileJob\n      ...modularTileEmptyState\n      ...modularTileListing\n      ...modularTileLocalDisplayAd\n      ...modularTileSearchAlert\n      ...modularTileSellerAd\n      ...modularModuleTileAdsPostXAd\n      __typename\n    }\n    modules {\n      ...modularGridModule\n      __typename\n    }\n    pageCursor\n    query {\n      ...modularQueryInfo\n      __typename\n    }\n    requestTimeMetadata {\n      resolverComputationTimeSeconds\n      serviceRequestTimeSeconds\n      totalResolverTimeSeconds\n      __typename\n    }\n    searchAlert {\n      alertId\n      alertStatus\n      __typename\n    }\n    debugInformation @include(if: $debug) {\n      rankedListings {\n        listingId\n        attributes {\n          key\n          value\n          __typename\n        }\n        __typename\n      }\n      lastViewedItems {\n        listingId\n        attributes {\n          key\n          value\n          __typename\n        }\n        __typename\n      }\n      categoryAffinities {\n        affinity\n        count\n        decay\n        affinityOwner\n        __typename\n      }\n      rankingStats {\n        key\n        value\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment modularFilterNumericRange on ModularFeedNumericRangeFilter {\n  isExpandedHighlight\n  lowerBound {\n    ...modularFilterNumericRangeBound\n    __typename\n  }\n  shortcutLabel\n  shortcutRank\n  subTitle\n  targetName\n  title\n  type\n  upperBound {\n    ...modularFilterNumericRangeBound\n    __typename\n  }\n  __typename\n}\n\nfragment modularFilterNumericRangeBound on ModularFeedNumericRangeFilterNumericRangeBound {\n  label\n  limit\n  placeholderText\n  targetName\n  value\n  __typename\n}\n\nfragment modularFilterSelectionList on ModularFeedSelectionListFilter {\n  targetName\n  title\n  subTitle\n  shortcutLabel\n  shortcutRank\n  type\n  isExpandedHighlight\n  options {\n    ...modularFilterSelectionListOption\n    __typename\n  }\n  __typename\n}\n\nfragment modularFilterSelectionListOption on ModularFeedSelectionListFilterOption {\n  isDefault\n  isSelected\n  label\n  subLabel\n  value\n  __typename\n}\n\nfragment legacyFeedOptionListSelection on FeedOptionListSelection {\n  label\n  labelShort\n  name\n  options {\n    default\n    label\n    labelShort\n    selected\n    subLabel\n    value\n    __typename\n  }\n  position\n  queryParam\n  type\n  __typename\n}\n\nfragment legacyFeedOptionNumericRange on FeedOptionNumericRange {\n  label\n  labelShort\n  leftQueryParam\n  lowerBound\n  name\n  options {\n    currentValue\n    label\n    textHint\n    __typename\n  }\n  position\n  rightQueryParam\n  type\n  units\n  upperBound\n  __typename\n}\n\nfragment modularTileBanner on ModularFeedTileBanner {\n  tileId\n  tileType\n  title\n  __typename\n}\n\nfragment modularTileBingAd on ModularFeedTileBingAd {\n  tileId\n  bingAd {\n    ouAdId\n    adExperimentId\n    adNetwork\n    adRequestId\n    adTileType\n    adSettings {\n      repeatClickRefractoryPeriodMillis\n      __typename\n    }\n    bingClientId\n    clickFeedbackUrl\n    clickReturnUrl\n    contentUrl\n    deepLinkEnabled\n    experimentDataHash\n    image {\n      height\n      url\n      width\n      __typename\n    }\n    impressionFeedbackUrl\n    impressionUrls\n    viewableImpressionUrls\n    installmentInfo {\n      amount\n      description\n      downPayment\n      __typename\n    }\n    itemName\n    lowPrice\n    price\n    searchId\n    sellerName\n    templateFields {\n      key\n      value\n      __typename\n    }\n    __typename\n  }\n  tileType\n  __typename\n}\n\nfragment modularTileGoogleDisplayAd on ModularFeedTileGoogleDisplayAd {\n  tileId\n  googleDisplayAd {\n    ouAdId\n    additionalSizes\n    adExperimentId\n    adHeight\n    adNetwork\n    adPage\n    adRequestId\n    adTileType\n    adWidth\n    adaptive\n    channel\n    clickFeedbackUrl\n    clientId\n    contentUrl\n    customTargeting {\n      key\n      values\n      __typename\n    }\n    displayAdType\n    errorDrawable {\n      actionPath\n      listImage {\n        height\n        url\n        width\n        __typename\n      }\n      __typename\n    }\n    experimentDataHash\n    formatIds\n    impressionFeedbackUrl\n    personalizationProperties {\n      key\n      values\n      __typename\n    }\n    prebidConfigs {\n      key\n      values {\n        timeout\n        tamSlotUUID\n        liftoffPlacementIDs\n        __typename\n      }\n      __typename\n    }\n    renderLocation\n    searchId\n    searchQuery\n    templateId\n    __typename\n  }\n  tileType\n  __typename\n}\n\nfragment modularTileJob on ModularFeedTileJob {\n  tileId\n  tileType\n  job {\n    address {\n      city\n      state\n      zipcode\n      __typename\n    }\n    companyName\n    datePosted\n    image {\n      height\n      url\n      width\n      __typename\n    }\n    industry\n    jobId\n    jobListingUrl\n    jobOwnerId\n    pills {\n      text\n      type\n      __typename\n    }\n    title\n    apply {\n      method\n      value\n      __typename\n    }\n    wageDisplayValue\n    provider\n    __typename\n  }\n  __typename\n}\n\nfragment modularTileEmptyState on ModularFeedTileEmptyState {\n  tileId\n  tileType\n  title\n  description\n  iconType\n  __typename\n}\n\nfragment modularTileListing on ModularFeedTileListing {\n  tileId\n  listing {\n    ...modularListing\n    __typename\n  }\n  tileType\n  __typename\n}\n\nfragment modularListing on ModularFeedListing {\n  listingId\n  conditionText\n  flags\n  image {\n    height\n    url\n    width\n    __typename\n  }\n  isFirmPrice\n  locationName\n  price\n  title\n  vehicleMiles\n  __typename\n}\n\nfragment modularTileLocalDisplayAd on ModularFeedTileLocalDisplayAd {\n  tileId\n  localDisplayAd {\n    ouAdId\n    adExperimentId\n    adNetwork\n    adRequestId\n    adTileType\n    advertiserId\n    businessName\n    callToAction\n    callToActionType\n    clickFeedbackUrl\n    contentUrl\n    experimentDataHash\n    headline\n    image {\n      height\n      url\n      width\n      __typename\n    }\n    impressionFeedbackUrl\n    searchId\n    __typename\n  }\n  tileType\n  __typename\n}\n\nfragment modularTileSearchAlert on ModularFeedTileSearchAlert {\n  tileId\n  tileType\n  title\n  __typename\n}\n\nfragment modularTileSellerAd on ModularFeedTileSellerAd {\n  tileId\n  listing {\n    ...modularListing\n    __typename\n  }\n  sellerAd {\n    ouAdId\n    adId\n    adExperimentId\n    adNetwork\n    adRequestId\n    adTileType\n    clickFeedbackUrl\n    experimentDataHash\n    impressionFeedbackUrl\n    searchId\n    __typename\n  }\n  tileType\n  __typename\n}\n\nfragment modularModuleTileAdsPostXAd on ModularFeedTileAdsPostXAd {\n  ...modularTileAdsPostXAd\n  moduleId\n  moduleRank\n  moduleType\n  __typename\n}\n\nfragment modularTileAdsPostXAd on ModularFeedTileAdsPostXAd {\n  tileId\n  adsPostXAd {\n    ouAdId\n    adExperimentId\n    adNetwork\n    adRequestId\n    adTileType\n    clickFeedbackUrl\n    experimentDataHash\n    impressionFeedbackUrl\n    searchId\n    offer {\n      beacons {\n        noThanksClick\n        close\n        __typename\n      }\n      title\n      description\n      clickUrl\n      image\n      pixel\n      ctaYes\n      ctaNo\n      __typename\n    }\n    __typename\n  }\n  tileType\n  __typename\n}\n\nfragment modularGridModule on ModularFeedModuleGrid {\n  moduleId\n  collection\n  formFactor\n  grid {\n    actionPath\n    tiles {\n      ...modularModuleTileBingAd\n      ...modularModuleTileGoogleDisplayAd\n      ...modularModuleTileListing\n      ...modularModuleTileLocalDisplayAd\n      ...modularModuleTileSellerAd\n      __typename\n    }\n    __typename\n  }\n  moduleType\n  rank\n  rowIndex\n  searchId\n  subTitle\n  title\n  infoActionPath\n  __typename\n}\n\nfragment modularModuleTileBingAd on ModularFeedTileBingAd {\n  ...modularTileBingAd\n  moduleId\n  moduleRank\n  moduleType\n  __typename\n}\n\nfragment modularModuleTileGoogleDisplayAd on ModularFeedTileGoogleDisplayAd {\n  ...modularTileGoogleDisplayAd\n  moduleId\n  moduleRank\n  moduleType\n  __typename\n}\n\nfragment modularModuleTileListing on ModularFeedTileListing {\n  ...modularTileListing\n  moduleId\n  moduleRank\n  moduleType\n  __typename\n}\n\nfragment modularModuleTileLocalDisplayAd on ModularFeedTileLocalDisplayAd {\n  ...modularTileLocalDisplayAd\n  moduleId\n  moduleRank\n  moduleType\n  __typename\n}\n\nfragment modularModuleTileSellerAd on ModularFeedTileSellerAd {\n  ...modularTileSellerAd\n  moduleId\n  moduleRank\n  moduleType\n  __typename\n}\n\nfragment modularQueryInfo on ModularFeedQueryInfo {\n  appliedQuery\n  decisionType\n  originalQuery\n  suggestedQuery\n  __typename\n}\n',
			},
			{
				operationName: 'GetModularFeed',
				variables: {
					debug: false,
					searchParams: [
						{ key: 'DISTANCE', value: '5' },
						{ key: 'platform', value: 'web_mobile' },
						{ key: 'zipcode', value: zipcode },
						{ key: 'experiment_id', value: 'experimentmodel24' },
						{ key: 'limit', value: '100' },
						{ key: 'searchSessionId', value: '52c93fc1-58fb-4545-83ad-59dd8bb18a62' },
						//{key: "cid", value: "12.10"}//office supplies
						// {key: "cid", value: "1.7"}//books, movies, entertainment
						// {key: "cid", value: "2.1"}//furniture
						{ key: 'cid', value: '2.2' }, //household needs
					],
				},
				query:
					'query GetModularFeed($searchParams: [SearchParam], $debug: Boolean = false) {\n  modularFeed(params: $searchParams, debug: $debug) {\n    analyticsData {\n      requestId\n      searchPerformedEventUniqueId\n      searchSessionId\n      __typename\n    }\n    categoryInfo {\n      categoryId\n      isForcedCategory\n      __typename\n    }\n    feedAdditions\n    filters {\n      ...modularFilterNumericRange\n      ...modularFilterSelectionList\n      __typename\n    }\n    legacyFeedOptions {\n      ...legacyFeedOptionListSelection\n      ...legacyFeedOptionNumericRange\n      __typename\n    }\n    looseTiles {\n      ...modularTileBanner\n      ...modularTileBingAd\n      ...modularTileGoogleDisplayAd\n      ...modularTileJob\n      ...modularTileEmptyState\n      ...modularTileListing\n      ...modularTileLocalDisplayAd\n      ...modularTileSearchAlert\n      ...modularTileSellerAd\n      ...modularModuleTileAdsPostXAd\n      __typename\n    }\n    modules {\n      ...modularGridModule\n      __typename\n    }\n    pageCursor\n    query {\n      ...modularQueryInfo\n      __typename\n    }\n    requestTimeMetadata {\n      resolverComputationTimeSeconds\n      serviceRequestTimeSeconds\n      totalResolverTimeSeconds\n      __typename\n    }\n    searchAlert {\n      alertId\n      alertStatus\n      __typename\n    }\n    debugInformation @include(if: $debug) {\n      rankedListings {\n        listingId\n        attributes {\n          key\n          value\n          __typename\n        }\n        __typename\n      }\n      lastViewedItems {\n        listingId\n        attributes {\n          key\n          value\n          __typename\n        }\n        __typename\n      }\n      categoryAffinities {\n        affinity\n        count\n        decay\n        affinityOwner\n        __typename\n      }\n      rankingStats {\n        key\n        value\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment modularFilterNumericRange on ModularFeedNumericRangeFilter {\n  isExpandedHighlight\n  lowerBound {\n    ...modularFilterNumericRangeBound\n    __typename\n  }\n  shortcutLabel\n  shortcutRank\n  subTitle\n  targetName\n  title\n  type\n  upperBound {\n    ...modularFilterNumericRangeBound\n    __typename\n  }\n  __typename\n}\n\nfragment modularFilterNumericRangeBound on ModularFeedNumericRangeFilterNumericRangeBound {\n  label\n  limit\n  placeholderText\n  targetName\n  value\n  __typename\n}\n\nfragment modularFilterSelectionList on ModularFeedSelectionListFilter {\n  targetName\n  title\n  subTitle\n  shortcutLabel\n  shortcutRank\n  type\n  isExpandedHighlight\n  options {\n    ...modularFilterSelectionListOption\n    __typename\n  }\n  __typename\n}\n\nfragment modularFilterSelectionListOption on ModularFeedSelectionListFilterOption {\n  isDefault\n  isSelected\n  label\n  subLabel\n  value\n  __typename\n}\n\nfragment legacyFeedOptionListSelection on FeedOptionListSelection {\n  label\n  labelShort\n  name\n  options {\n    default\n    label\n    labelShort\n    selected\n    subLabel\n    value\n    __typename\n  }\n  position\n  queryParam\n  type\n  __typename\n}\n\nfragment legacyFeedOptionNumericRange on FeedOptionNumericRange {\n  label\n  labelShort\n  leftQueryParam\n  lowerBound\n  name\n  options {\n    currentValue\n    label\n    textHint\n    __typename\n  }\n  position\n  rightQueryParam\n  type\n  units\n  upperBound\n  __typename\n}\n\nfragment modularTileBanner on ModularFeedTileBanner {\n  tileId\n  tileType\n  title\n  __typename\n}\n\nfragment modularTileBingAd on ModularFeedTileBingAd {\n  tileId\n  bingAd {\n    ouAdId\n    adExperimentId\n    adNetwork\n    adRequestId\n    adTileType\n    adSettings {\n      repeatClickRefractoryPeriodMillis\n      __typename\n    }\n    bingClientId\n    clickFeedbackUrl\n    clickReturnUrl\n    contentUrl\n    deepLinkEnabled\n    experimentDataHash\n    image {\n      height\n      url\n      width\n      __typename\n    }\n    impressionFeedbackUrl\n    impressionUrls\n    viewableImpressionUrls\n    installmentInfo {\n      amount\n      description\n      downPayment\n      __typename\n    }\n    itemName\n    lowPrice\n    price\n    searchId\n    sellerName\n    templateFields {\n      key\n      value\n      __typename\n    }\n    __typename\n  }\n  tileType\n  __typename\n}\n\nfragment modularTileGoogleDisplayAd on ModularFeedTileGoogleDisplayAd {\n  tileId\n  googleDisplayAd {\n    ouAdId\n    additionalSizes\n    adExperimentId\n    adHeight\n    adNetwork\n    adPage\n    adRequestId\n    adTileType\n    adWidth\n    adaptive\n    channel\n    clickFeedbackUrl\n    clientId\n    contentUrl\n    customTargeting {\n      key\n      values\n      __typename\n    }\n    displayAdType\n    errorDrawable {\n      actionPath\n      listImage {\n        height\n        url\n        width\n        __typename\n      }\n      __typename\n    }\n    experimentDataHash\n    formatIds\n    impressionFeedbackUrl\n    personalizationProperties {\n      key\n      values\n      __typename\n    }\n    prebidConfigs {\n      key\n      values {\n        timeout\n        tamSlotUUID\n        liftoffPlacementIDs\n        __typename\n      }\n      __typename\n    }\n    renderLocation\n    searchId\n    searchQuery\n    templateId\n    __typename\n  }\n  tileType\n  __typename\n}\n\nfragment modularTileJob on ModularFeedTileJob {\n  tileId\n  tileType\n  job {\n    address {\n      city\n      state\n      zipcode\n      __typename\n    }\n    companyName\n    datePosted\n    image {\n      height\n      url\n      width\n      __typename\n    }\n    industry\n    jobId\n    jobListingUrl\n    jobOwnerId\n    pills {\n      text\n      type\n      __typename\n    }\n    title\n    apply {\n      method\n      value\n      __typename\n    }\n    wageDisplayValue\n    provider\n    __typename\n  }\n  __typename\n}\n\nfragment modularTileEmptyState on ModularFeedTileEmptyState {\n  tileId\n  tileType\n  title\n  description\n  iconType\n  __typename\n}\n\nfragment modularTileListing on ModularFeedTileListing {\n  tileId\n  listing {\n    ...modularListing\n    __typename\n  }\n  tileType\n  __typename\n}\n\nfragment modularListing on ModularFeedListing {\n  listingId\n  conditionText\n  flags\n  image {\n    height\n    url\n    width\n    __typename\n  }\n  isFirmPrice\n  locationName\n  price\n  title\n  vehicleMiles\n  __typename\n}\n\nfragment modularTileLocalDisplayAd on ModularFeedTileLocalDisplayAd {\n  tileId\n  localDisplayAd {\n    ouAdId\n    adExperimentId\n    adNetwork\n    adRequestId\n    adTileType\n    advertiserId\n    businessName\n    callToAction\n    callToActionType\n    clickFeedbackUrl\n    contentUrl\n    experimentDataHash\n    headline\n    image {\n      height\n      url\n      width\n      __typename\n    }\n    impressionFeedbackUrl\n    searchId\n    __typename\n  }\n  tileType\n  __typename\n}\n\nfragment modularTileSearchAlert on ModularFeedTileSearchAlert {\n  tileId\n  tileType\n  title\n  __typename\n}\n\nfragment modularTileSellerAd on ModularFeedTileSellerAd {\n  tileId\n  listing {\n    ...modularListing\n    __typename\n  }\n  sellerAd {\n    ouAdId\n    adId\n    adExperimentId\n    adNetwork\n    adRequestId\n    adTileType\n    clickFeedbackUrl\n    experimentDataHash\n    impressionFeedbackUrl\n    searchId\n    __typename\n  }\n  tileType\n  __typename\n}\n\nfragment modularModuleTileAdsPostXAd on ModularFeedTileAdsPostXAd {\n  ...modularTileAdsPostXAd\n  moduleId\n  moduleRank\n  moduleType\n  __typename\n}\n\nfragment modularTileAdsPostXAd on ModularFeedTileAdsPostXAd {\n  tileId\n  adsPostXAd {\n    ouAdId\n    adExperimentId\n    adNetwork\n    adRequestId\n    adTileType\n    clickFeedbackUrl\n    experimentDataHash\n    impressionFeedbackUrl\n    searchId\n    offer {\n      beacons {\n        noThanksClick\n        close\n        __typename\n      }\n      title\n      description\n      clickUrl\n      image\n      pixel\n      ctaYes\n      ctaNo\n      __typename\n    }\n    __typename\n  }\n  tileType\n  __typename\n}\n\nfragment modularGridModule on ModularFeedModuleGrid {\n  moduleId\n  collection\n  formFactor\n  grid {\n    actionPath\n    tiles {\n      ...modularModuleTileBingAd\n      ...modularModuleTileGoogleDisplayAd\n      ...modularModuleTileListing\n      ...modularModuleTileLocalDisplayAd\n      ...modularModuleTileSellerAd\n      __typename\n    }\n    __typename\n  }\n  moduleType\n  rank\n  rowIndex\n  searchId\n  subTitle\n  title\n  infoActionPath\n  __typename\n}\n\nfragment modularModuleTileBingAd on ModularFeedTileBingAd {\n  ...modularTileBingAd\n  moduleId\n  moduleRank\n  moduleType\n  __typename\n}\n\nfragment modularModuleTileGoogleDisplayAd on ModularFeedTileGoogleDisplayAd {\n  ...modularTileGoogleDisplayAd\n  moduleId\n  moduleRank\n  moduleType\n  __typename\n}\n\nfragment modularModuleTileListing on ModularFeedTileListing {\n  ...modularTileListing\n  moduleId\n  moduleRank\n  moduleType\n  __typename\n}\n\nfragment modularModuleTileLocalDisplayAd on ModularFeedTileLocalDisplayAd {\n  ...modularTileLocalDisplayAd\n  moduleId\n  moduleRank\n  moduleType\n  __typename\n}\n\nfragment modularModuleTileSellerAd on ModularFeedTileSellerAd {\n  ...modularTileSellerAd\n  moduleId\n  moduleRank\n  moduleType\n  __typename\n}\n\nfragment modularQueryInfo on ModularFeedQueryInfo {\n  appliedQuery\n  decisionType\n  originalQuery\n  suggestedQuery\n  __typename\n}\n',
			},
		];
		const response = await Promise.all(payloads.map(payload => axios.post('https://offerup.com/api/graphql', payload)));
		const combined = response.map(result => result.data);

		res.status(200).json(combined);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to fetch data from the external API' });
	}
};

export default thirdPartyHome;
