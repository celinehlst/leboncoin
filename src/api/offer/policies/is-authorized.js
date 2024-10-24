module.exports = async (policyContext, config, { strapi }) => {
  const userId = policyContext.state.user.id;
  if (policyContext.request.params.id) {
    const offerId = policyContext.request.params.id;
    const offer = await strapi.entityService.findOne(
      "api::offer.offer",
      offerId,
      { populate: ["owner"] }
    );
    const offerOwnerId = offer.owner.id;
    if (userId !== offerOwnerId) {
      return false;
    } else {
      return true;
    }
  } else {
    const offerOwner = JSON.parse(policyContext.request.body.data).owner;
    if (userId !== offerOwner) {
      return false;
    } else {
      return true;
    }
  }
};
