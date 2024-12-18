"use client";

import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  FormHelperText,
  Image,
  Input,
  Select,
  SimpleGrid,
  Spinner,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as _ from "lodash-es";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { encode } from "js-base64";
import { atom, useAtom, useAtomValue, createStore, Provider } from "jotai";
import * as React from "react";
import CardDraftVersion from "./CardDraftVersion";

const fontFamilyListAtom = atom();
const fontFamilyAtom = atom("Gentium Book Plus");
const fontVariantListAtom = atom((get) => {
  const fontFamilyList = get(fontFamilyListAtom);
  const fontFamily = get(fontFamilyAtom);
  const font = fontFamilyList.find((it) => it.family === fontFamily);
  return font?.variants || [];
});
const fontVariantAtom = atom("regular");
// ------------------------
const imageUriAtom = atom(
  `https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80`
);
const headingAtom = atom(`Living room Sofa`);
const textAtom = atom(
  `This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned spaces and for people who love a chic design with a sprinkle of vintage design.`
);
const footerTextAtom = atom(`Buy now / Add to cart.`);
// ------------------------
const cardTwAtom = atom(
  "w-full h-full flex flex-col p-4 bg-white box-shadow-md"
);
const cardBodyTwAtom = atom("flex flex-row");
const headingTwAtom = atom(
  "basis-2/5 border-r-2 border-gray-200 pr-4 text-9xl font-bold text-gray-900 text-center"
);
const stackTwAtom = atom(
  "grow flex flex-col pl-4 text-2xl text-left text-wrap break-words"
);
const textTwAtom = atom("py-1 text-wrap break-words text-gray-600");
const cardFooterTwAtom = atom(
  "flex flex-col mt-10 border-t border-gray-200 pt-10"
);
const imageTwAtom = atom("h-16");
const footerTextTwAtom = atom("text-md text-teal-500");

const textListAtom = atom([
  {
    key: "imageUri",
    label: "Image URI",
    atom: imageUriAtom,
  },
  {
    key: "heading",
    label: "Heading",
    atom: headingAtom,
  },
  {
    key: "text",
    label: "Text",
    atom: textAtom,
  },
  {
    key: "footerText",
    label: "Footer Text",
    atom: footerTextAtom,
  },
]);

const styleListAtom = atom([
  {
    key: "cardTw",
    label: "Card - Tailwind",
    atom: cardTwAtom,
    rows: 2,
  },
  {
    key: "cardBodyTw",
    label: "Card Body - Tailwind",
    atom: cardBodyTwAtom,
    rows: 2,
  },
  {
    key: "imageTw",
    label: "Image - Tailwind",
    atom: imageTwAtom,
    rows: 2,
  },
  {
    key: "stackTw",
    label: "Stack - Tailwind",
    atom: stackTwAtom,
    rows: 2,
  },
  {
    key: "headingTw",
    label: "Heading - Tailwind",
    atom: headingTwAtom,
    rows: 3,
  },
  {
    key: "textTw",
    label: "Text - Tailwind",
    atom: textTwAtom,
    rows: 4,
  },
  {
    key: "cardFooterTw",
    label: "Card Footer - Tailwind",
    atom: cardFooterTwAtom,
    rows: 2,
  },
  {
    key: "footerTextTw",
    label: "Footer Text - Tailwind",
    atom: footerTextTwAtom,
    rows: 4,
  },
]);

const cardUiChakraPropsAtom = atom((get) => {
  const fontFamily = get(fontFamilyAtom);
  const fontVariant = get(fontVariantAtom);
  // ------------------------
  const imageUri = get(imageUriAtom);
  const heading = get(headingAtom);
  const text = get(textAtom);
  const footerText = get(footerTextAtom);
  // ------------------------
  const cardTw = get(cardTwAtom);
  const cardBodyTw = get(cardBodyTwAtom);
  const imageTw = get(imageTwAtom);
  const stackTw = get(stackTwAtom);
  const headingTw = get(headingTwAtom);
  const textTw = get(textTwAtom);
  const cardFooterTw = get(cardFooterTwAtom);
  const footerTextTw = get(footerTextTwAtom);
  return {
    fontFamily,
    fontVariant,
    // ------------------------
    imageUri,
    heading,
    text,
    footerText,
    // ------------------------
    cardTw,
    cardBodyTw,
    imageTw,
    stackTw,
    headingTw,
    textTw,
    cardFooterTw,
    footerTextTw,
  };
});

const opengraphImageUriAtom = atom((get) => {
  const cardUiChakraProps = get(cardUiChakraPropsAtom);
  const slug = encodeURIComponent(encode(JSON.stringify(cardUiChakraProps)));
  return `/${slug}/opengraph-image`;
});

function FontFamilyOptionList() {
  const fontFamilyList = useAtomValue(fontFamilyListAtom);
  return (
    <React.Fragment>
      {fontFamilyList.map((it) => (
        <option key={it.family} value={it.family}>
          {it.family}
          {it.variants.length > 1 && ` (${it.variants.length} variants)`}
        </option>
      ))}
    </React.Fragment>
  );
}

function FontVariantOptionList() {
  const fontVariantList = useAtomValue(fontVariantListAtom);
  return (
    <React.Fragment>
      {fontVariantList.map((it) => (
        <option key={it} value={it}>
          {it}
        </option>
      ))}
    </React.Fragment>
  );
}

function FontFieldset() {
  const [fontFamily, setFontFamily] = useAtom(fontFamilyAtom);
  const [fontVariant, setFontVariant] = useAtom(fontVariantAtom);

  return (
    <React.Fragment>
      <FormControl>
        <FormLabel>Font Family</FormLabel>
        <React.Suspense fallback={<Spinner size="sm" />}>
          <Select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
          >
            <option value="">Select a font family</option>
            <FontFamilyOptionList />
          </Select>
        </React.Suspense>
      </FormControl>
      {fontFamily && (
        <FormControl>
          <FormLabel>Font Variant</FormLabel>
          <React.Suspense fallback={<Spinner size="sm" />}>
            <Select
              value={fontVariant}
              onChange={(e) => setFontVariant(e.target.value)}
            >
              <option value="">Select a font variant</option>
              <FontVariantOptionList />
            </Select>
          </React.Suspense>
        </FormControl>
      )}
    </React.Fragment>
  );
}

function TextField({ label, atom }) {
  const [value, setValue] = useAtom(atom);
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Textarea
        defaultValue={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </FormControl>
  );
}

function Content() {
  const pathname = usePathname();
  const textList = useAtomValue(textListAtom);
  const styleList = useAtomValue(styleListAtom);
  const cardUiChakraProps = useAtomValue(cardUiChakraPropsAtom);
  const opengraphImageUri = useAtomValue(opengraphImageUriAtom);

  return (
    <SimpleGrid columns={[1, 2]} gap={4} p={10}>
      <VStack as="form" spacing={4}>
        <FontFieldset />
        {textList.map(({ key, ...restProps }) => (
          <TextField key={key} {...restProps} />
        ))}
      </VStack>
      <VStack spacing={6} align="flex-start">
        <Box
          w="full"
          maxH="630px"
          border="1px solid"
          rounded="lg"
          overflow="hidden"
        >
          <CardDraftVersion {...cardUiChakraProps} />
        </Box>
        <FormControl>
          <FormLabel>Open Graph Image URI</FormLabel>
          <Textarea value={pathname + opengraphImageUri} onChange={_.noop} />
        </FormControl>
        <Box pos="relative">
          <Box
            pos="absolute"
            border="2px solid"
            rounded="lg"
            overflow="hidden"
            minW="1204px"
            minH="634px"
            transform="scale(50%)"
            transformOrigin="0 0"
          >
            <Image src={pathname + opengraphImageUri} />
          </Box>
        </Box>
      </VStack>
    </SimpleGrid>
  );
}

export default function DraftPage({ googfontAll }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const homeStore = React.useMemo(
    () => createStoreWith(googfontAll, searchParams),
    [googfontAll, searchParams]
  );
  React.useEffect(() => {
    const unsub = homeStore.sub(
      urlSearchParamsAtom,
      _.debounce(() => {
        const urlSearchParams = homeStore.get(urlSearchParamsAtom);
        router.replace(`${pathname}?${urlSearchParams}`);
      }, 3000)
    );
    return unsub;
  }, [homeStore, pathname, router]);

  return (
    <Provider store={homeStore}>
      <Content />
    </Provider>
  );
}

function createStoreWith(googfontAll, searchParams) {
  const homeStore = createStore();
  homeStore.set(fontFamilyListAtom, googfontAll);
  homeStore.set(fontFamilyAtom, searchParams.get("fontFamily") || fontFamilyAtom.init);
  homeStore.set(
    fontVariantAtom,
    searchParams.get("fontVariant") || fontVariantAtom.init
  );
  // ------------------------
  homeStore.set(imageUriAtom, searchParams.get("imageUri") || imageUriAtom.init);
  homeStore.set(headingAtom, searchParams.get("heading") || headingAtom.init);
  homeStore.set(textAtom, searchParams.get("text") || textAtom.init);
  homeStore.set(footerTextAtom, searchParams.get("footerText") || footerTextAtom.init);
  // ------------------------
  homeStore.set(cardTwAtom, searchParams.get("cardTw") || cardTwAtom.init);
  homeStore.set(cardBodyTwAtom, searchParams.get("cardBodyTw") || cardBodyTwAtom.init);
  homeStore.set(imageTwAtom, searchParams.get("imageTw") || imageTwAtom.init);
  homeStore.set(stackTwAtom, searchParams.get("stackTw") || stackTwAtom.init);
  homeStore.set(headingTwAtom, searchParams.get("headingTw") || headingTwAtom.init);
  homeStore.set(textTwAtom, searchParams.get("textTw") || textTwAtom.init);
  homeStore.set(
    cardFooterTwAtom,
    searchParams.get("cardFooterTw") || cardFooterTwAtom.init
  );
  homeStore.set(
    footerTextTwAtom,
    searchParams.get("footerTextTw") || footerTextTwAtom.init
  );
  return homeStore;
}

const urlSearchParamsAtom = atom((get) => {
  const entries = Object.fromEntries(
    [
      { key: "fontFamily", atom: fontFamilyAtom },
      { key: "fontVariant", atom: fontVariantAtom },
      // ------------------------
      { key: "imageUri", atom: imageUriAtom },
      { key: "heading", atom: headingAtom },
      { key: "text", atom: textAtom },
      { key: "footerText", atom: footerTextAtom },
      // ------------------------
      { key: "cardTw", atom: cardTwAtom },
      { key: "cardBodyTw", atom: cardBodyTwAtom },
      { key: "imageTw", atom: imageTwAtom },
      { key: "stackTw", atom: stackTwAtom },
      { key: "headingTw", atom: headingTwAtom },
      { key: "textTw", atom: textTwAtom },
      { key: "cardFooterTw", atom: cardFooterTwAtom },
      { key: "footerTextTw", atom: footerTextTwAtom },
    ].flatMap(({ key, atom }) => {
      const value = get(atom);
      return value && value !== atom.init ? [[key, value]] : [];
    })
  );
  return new URLSearchParams(entries);
});
