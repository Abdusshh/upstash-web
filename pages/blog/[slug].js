import Head from "next/head";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Heading,
  HStack,
  SimpleGrid,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useMDXComponent } from "next-contentlayer/hooks";
import { allBlogs } from "contentlayer/generated";
import { toLower } from "lodash";
import { compareDesc, format, parseISO } from "date-fns";
import NextLink from "next/link";
import Section from "components/section";
import Bg from "components/bg";
import OtherPostCard from "components/other-post-card";
import { META } from "../../constants";

export async function getStaticPaths() {
  const paths = allBlogs.map((doc) => ({ params: { slug: doc.slug } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const posts = allBlogs.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });

  const indexOfPost = posts.findIndex(
    (doc) => toLower(doc.slug) === toLower(params.slug)
  );

  if (indexOfPost < 0) {
    return {
      redirect: {
        destination: "/404",
      },
    };
  }

  const post = posts[indexOfPost];
  const nextPost = indexOfPost > 0 ? posts[indexOfPost - 1] : null;
  const prevPost =
    indexOfPost < posts.length - 1 ? posts[indexOfPost + 1] : null;

  return {
    props: {
      post,
      prevPost,
      nextPost,
    },
  };
}

export default function CareerDetailPage({ post, prevPost, nextPost }) {
  const Component = useMDXComponent(post.body.code);

  return (
    <>
      <Head>
        <title>{post.title}</title>
        {/*<meta
          name="description"
          content="Recently, Netlify announced Edge Functions where you can run your code at edge locations on Deno runtime with globally low latency. In this post, we will build a simple app which runs Netlify Edge functions and accesses Upstash Redis as a data store. Upstash Redis is a perfect match for Netlify Edge Functions because:"
        />*/}
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.authorObj.url} />
        <meta property="article:tag" content={post.tags.join(",")} />

        <link key="canonical" rel="canonical" href={post.url} />
        <link rel="alternate" href={post.url} hrefLang="en" />
        <link rel="alternate" href={post.url} hrefLang="x-default" />

        {/* facebook */}
        <meta key="og:type" property="og:type" content="article" />
        <meta key="og:url" property="og:url" content={post.url} />
        <meta key="og:title" property="og:title" content={post.title} />
        {/*        <meta
          property="og:description"
          content="Recently, Netlify announced Edge Functions where you can run your code at edge locations on Deno runtime with globally low latency. In this post, we will build a simple app which runs Netlify Edge functions and accesses Upstash Redis as a data store. Upstash Redis is a perfect match for Netlify Edge Functions because:"
        />*/}
        <meta
          key="og:image"
          property="og:image"
          content={post.image || post.metaImage}
        />

        {/* twitter */}
        <meta key="twitter:url" name="twitter:url" content={post.url} />
        <meta key="twitter:title" name="twitter:title" content={post.title} />
        {/*<meta
          key="twitter:description"
          name="twitter:description"
          content={META.description}
        />*/}
        <meta
          key="twitter:image"
          name="twitter:image"
          content={post.image || post.metaImage}
        />
      </Head>

      <Box as="header" pt={["80px", "100px"]} textAlign="center">
        <Container maxW="4xl">
          <HStack justify="center" color="whiteAlpha.600">
            <Text as="time" dateTime={post.date}>
              {format(parseISO(post.date), "LLLL d, yyyy")}
            </Text>
            <Text>·</Text>
            <Text as="span">{post.readingTime.text}</Text>
          </HStack>

          <Heading
            as="h1"
            mt={2}
            fontWeight="bold"
            size="2xl"
            lineHeight="shorter"
            letterSpacing="tight"
          >
            {post.title}
          </Heading>

          <Box mt={8}>
            <Avatar
              size="md"
              name={post.authorObj.name}
              src={post.authorObj.image_url}
            />
            <Box mt={4}>
              <Text fontWeight="semibold">{post.authorObj.name}</Text>
              <Text color="whiteAlpha.600">{post.authorObj.title}</Text>
            </Box>
          </Box>
        </Container>
      </Box>

      <Section mt="60px" pt={["80px", "100px"]} textAlign="left">
        <Bg />

        <Container maxW="3xl">
          {/* Post Body */}

          <Box className="post" color="whiteAlpha.800">
            <Component />
          </Box>

          {/* Post Tags */}

          <HStack spacing={2} mt={20}>
            <Text>Tags:</Text>
            {post.tags.map((tag) => (
              <NextLink key={tag} href={`/blog/tag/${tag}`}>
                <a>
                  <Tag size="lg" variant="subtle" colorScheme="gray">
                    {tag}
                  </Tag>
                </a>
              </NextLink>
            ))}
          </HStack>

          <Divider my={10} />

          {/* Other Post */}

          <SimpleGrid columns={2} spacing={10}>
            <OtherPostCard post={prevPost} />
            <OtherPostCard post={nextPost} align="right" />
          </SimpleGrid>

          <style global jsx>{`
            .post {
              line-height: 1.6;
            }

            .post > * {
              margin-bottom: 2rem;
            }

            .post > .rehype-code-title {
              margin-bottom: 0;
              padding: 0.3rem 1rem;
              background-color: #1d1f21;
              border-radius: 0.5em 0.5em 0 0;
              font-size: 0.9rem;
              color: rgb(255 255 255 / 40%);
              border-bottom: 1px solid #050505;
            }

            .post .rehype-code-title + pre {
              border-top-left-radius: 0;
              border-top-right-radius: 0;
            }

            .post a {
              color: #00e9a3;
              text-decoration: underline;
            }

            .post img {
              max-width: 100%;
              display: block;
              margin: 0 auto;
            }

            .post ul,
            .post ol {
              padding-left: 2rem;
            }

            .post :not(pre) > code {
              font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono",
                monospace;
              font-size: 0.9em;
              white-space: pre;
              word-spacing: normal;
              word-break: normal;
              word-wrap: normal;
              background: #1d1f21;
              padding: 0.15em 0.4em;
              border-radius: 0.4rem;
            }

            .post h2,
            .post h3,
            .post h4,
            .post h5 {
              color: white;
              font-weight: bold;
              line-height: 1.4;
            }

            .post > * + h2,
            .post > * + h3 {
              margin-top: 3rem;
            }

            .post > h2 {
              font-size: 2rem;
            }

            .post > h3 {
              font-size: 1.6rem;
            }

            .post > h4 {
              font-size: 1.2rem;
            }
          `}</style>
        </Container>
      </Section>
    </>
  );
}
