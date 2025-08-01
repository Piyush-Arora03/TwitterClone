const { LikeService } = require('../service');
const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function toggleLike(req, res) {
    try {
        const response = await LikeService.toggleLike(
            req.params.modelId,
            req.params.modelType,
            req.user.id
        );
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

module.exports = {
    toggleLike
}
