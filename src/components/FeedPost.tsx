import { MediaRenderer } from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";
import { ExplorePublicationsQuery } from "../graphql/generated";
import styles from "../styles/FeedPost.module.css";

type Props = {
  publication: ExplorePublicationsQuery["explorePublications"]["items"][0];
  quoteOn?: {                                           //这个quoteOn真的OK吗？
    __typename?: 'Comment' | 'Post' | 'Quote';
    id: any;
  };
};

export default function FeedPost({ publication }: Props) {
  console.log(publication);

  return (
    <div className={styles.feedPostContainer}>
      <div className={styles.feedPostHeader}>
        {/* Author Profile picture */}
        <MediaRenderer
          // @ts-ignore
          src={publication?.profile?.picture?.original?.url || ""}
          alt={publication.by.handle?.localName || publication.by.handle?.fullHandle}  //大改特改
          //alt={publication.profile.name || publication.profile.handle}
          className={styles.feedPostProfilePicture}
        />

        {/* Author profile Name */}
        <Link
          href={`/profile/${publication.by.handle?.fullHandle}`}
          className={styles.feedPostProfileName}
        >
          {publication.by.handle?.localName || publication.by.handle?.fullHandle}
        </Link>
      </div>

      <div className={styles.feedPostContent}>
        {/* Name of the post */}
        <h3 className={styles.feedPostContentTitle}>
          {publication.metadata.tags}
        </h3>

        {/* Description of the post */}
        <p className={styles.feedPostContentDescription}>
        
        {'__typename' in publication.metadata && publication.metadata.__typename === 'ArticleMetadataV3' ? publication.metadata.content : null}
        </p>

        {/* Image / media of the post if there is one */}
        {/*(publication.metadata.image ||
          publication.metadata.media?.length > 0) && (
          <MediaRenderer
            src={
              publication.metadata.image ||
              publication.metadata.media[0].original.url
            }
            alt={publication.metadata.name || ""}
            className={styles.feedPostContentImage*/}
        {'__typename' in publication.metadata && publication.metadata.__typename === 'ImageMetadataV3' && publication.metadata.asset?.image && (
          <MediaRenderer
            src={publication.metadata.asset.image.raw.uri}
            alt={"Image for " + publication.by?.handle?.fullHandle || ""}
            className={styles.feedPostContentImage}
          />
        )}
      </div>

      <div className={styles.feedPostFooter}>
        <p>{publication.stats.quotes} Collects</p>
        <p>{publication.stats.comments} Comments</p>
        <p>{publication.stats.mirrors} Mirrors</p>
      </div>
    </div>
  );
}
