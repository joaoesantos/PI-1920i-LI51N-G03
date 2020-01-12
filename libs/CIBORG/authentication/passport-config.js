'use strict';

let passportInitializer = (bcrypt, localStrategy, CiborgError) => {

    function initialize(passport, getUserById) {
        const authenticateUser = async(userId, password, done) => {
            try {
                const userData = await getUserById(userId);
                const user = userData.body;
                let isMatch = await bcrypt.compare(password, user.password);

                if (isMatch) {
                    return done(null, user);
                } else {
                    throw new CiborgError(null,
                        'Error in passport initializer.',
                        'Password Incorrect.',
                        '500' // Internal Server Error
                    );
                }
            } catch (err) {
                if (!(err instanceof CiborgError)) {
                    err = new CiborgError(err,
                        'Error in passport initializer.',
                        'Unable to login.',
                        '500' // Internal Server Error
                    );
                }
                console.log(err)
                done(err);
            }
        };

        passport.use(new localStrategy({
            usernameField: "userId",
            passwordField: "password"
        }, authenticateUser));

        passport.serializeUser((user, done) => done(null, user.userId));
        passport.deserializeUser((id, done) => done(null, id));
    }
    return initialize;
}
module.exports = passportInitializer;