const { CommentService } = require('../service');
const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function createComment(req, res) {
    try {
        const comment = await CommentService.create(
            req.user.id,
            req.params.tweetId,
            req.body.content
        );
        SuccessResponse.data = comment;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

module.exports = {
    createComment
}
