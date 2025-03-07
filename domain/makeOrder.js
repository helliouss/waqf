const STATUS_OPTIONS = {
  pending: 'PENDING',
  completed: 'COMPLETED',
  accepted: 'ACCEPTED',
}

module.exports = function buildMakeOrder({ getUniqueId }) {
  return function makeOrder({
    id = getUniqueId(),
    patientName,
    patientAge,
    oxygenRatio,
    hasChronicDesease,
    isCovid,
    prescriptionUrl,
    status = STATUS_OPTIONS.pending,
    assignedProductId = '',
    createdAt = Date.now(),
    acceptedAt = null,
    completedAt = null,
    ownerId,
  }) {
    if (!patientName) throw new Error('Product must have a patientName')
    if (!patientAge) throw new Error('Product must have a patientAge')
    if (!ownerId) throw new Error('Product must have a ownerId')
    if (!oxygenRatio) throw new Error('Product must have a oxygenRatio')
    if (!hasChronicDesease)
      throw new Error('Product must have a hasChronicDesease')
    if (!prescriptionUrl) {
      throw new Error('Product free days must be a prescriptionUrl')
    }
    if (isCovid) {
      throw new Error('Product day price must be a isCovid')
    }
    return Object.freeze({
      getId: () => id,
      getPatientName: () => patientName,
      getPatientAge: () => patientAge,
      getOxygenRatio: () => oxygenRatio,
      getHasChronicDesease: () => hasChronicDesease,
      getIsCovid: () => isCovid,
      getPrescriptionUrl: () => prescriptionUrl,
      getOwnerId: () => ownerId,
      getStatus: () => status,
      getAssignedProductId: () => assignedProductId,
      getCreatedAt: () => createdAt,
      getAcceptedAt: () => acceptedAt,
      getCompletedAt: () => completedAt,

      markPending: () => {
        status = STATUS_OPTIONS.pending
      },
      markAccepted: () => {
        status = STATUS_OPTIONS.accepted
      },
      markCompleted: () => {
        status = STATUS_OPTIONS.completed
      },
      assignProduct: (productId) => {
        assignedProductId = productId
      },
    })
  }
}
