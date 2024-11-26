import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/userModel.js"; // Make sure this path is correct

// JWT Options
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "i_got_no_secret", // Replace with your own secret key
};

// JWT Strategy
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false); // No user found
      }
    } catch (error) {
      return done(error, false); // Error finding user
    }
  })
);

// Exporting the passport initialization function
export const initializePassport = () => {
  passport.initialize();
};

export default passport;
