const { TweetService } = require('../service');
const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function createTweet(req, res) {
    try {
        const tweet = await TweetService.create(
            req.user.id,
            req.body.content
        );
        SuccessResponse.data = tweet;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

module.exports = {
    createTweet
}
