let passportInitializer = (bcrypt, localStrategy, CiborgError) => {

    function initialize(passport, getUserById) {
        const authenticateUser = async(userId, password, done) => {
            try {
                console.log('userId:', userId);
                console.log('password:', password);
                const user = (await getUserById(userId)).body;
                let isMatch = await bcrypt.compare(password, user.password);

                console.log('ismatch:', isMatch);
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: "Password Incorrect." });
                }
            } catch (err) {
                console.log('error')
                if (err instanceof CiborgError) {
                    throw err;
                } else {
                    throw new CiborgError(err,
                        'Error in passport initializer.',
                        'Unable to login.',
                        '500' // Internal Server Error
                    );
                }
            }
        };

        passport.use(new localStrategy({
            usernameField: "userId",
            passwordField: "password"
        }, authenticateUser));

        passport.serializeUser((user, done) => done(null, user.userId));
        passport.deserializeUser((id, done) => done(null, getUserById(id)));
    }
    return initialize;
}
module.exports = passportInitializer;