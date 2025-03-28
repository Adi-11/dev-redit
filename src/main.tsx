// Learn more at developers.reddit.com/docs
import { Devvit, useState } from "@devvit/public-api";

Devvit.configure({
  redditAPI: true,
});

// Add a menu item to the subreddit menu for instantiating the new experience post
Devvit.addMenuItem({
  label: "Add my post",
  location: "subreddit",
  forUserType: "moderator",
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    ui.showToast(
      "Submitting your post - upon completion you'll navigate there."
    );

    const subreddit = await reddit.getCurrentSubreddit();
    const post = await reddit.submitPost({
      title: "My devvit post",
      subredditName: subreddit.name,
      // The preview appears while the post loads
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <text size="large">Loading ...</text>
        </vstack>
      ),
    });
    ui.navigateTo(post);
  },
});

// Add a post type definition
Devvit.addCustomPostType({
  name: "Experience Post",
  height: "regular",
  render: (_context) => {
    const [counter, setCounter] = useState(0);
    const [story, setStory] = useState(["Elara found a whispering map. It led her into a glowing forest. A cloaked figure warned her of a powerful Black Circle. Now, she must choose: follow the map, or turn back."]);

    return (
      <zstack width="100%" height="100%">
        <image
          imageHeight={1024}
          imageWidth={1500}
          height="100%"
          width="100%"
          url="background.jpg"
          description="background image"
          resizeMode="fill"
        />
        <hstack backgroundColor="scrim-background" width="100%" height="100%" />
        <vstack
          height="100%"
          width="100%"
          gap="medium"
          alignment="center middle"
        >
          <image
            url="logo.png"
            description="logo"
            imageHeight={256}
            imageWidth={256}
            height="48px"
            width="48px"
          />
          {
            story.map((line) => (
              <text size="medium" wrap={true} width={'500px'}>{line}</text>
            ))
          }
        </vstack>
      </zstack>
    );
  },
});

export default Devvit;
