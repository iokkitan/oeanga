"use client";

import {
  Divider,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  SimpleGrid,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as _ from "lodash-es";
import { usePathname, useRouter } from "next/navigation";
import { atom, useAtom, useAtomValue, createStore, Provider } from "jotai";
import * as React from "react";
import CardUIChakra from "./components/CardUIChakra";

function parseJson(value) {
  try {
    return JSON.parse(value);
  } catch (error) {}
}

const imageUriAtom = atom(
  `https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80`
);
const headingAtom = atom(`Living room Sofa`);
const textAtom = atom(
  `This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned spaces and for people who love a chic design with a sprinkle of vintage design.`
);
const footerTextAtom = atom(`Buy now / Add to cart.`);
// ------------------------
const cardPropsAtom = atom({ maxW: "lg" });
const cardBodyPropsAtom = atom({});
const imagePropsAtom = atom({
  borderRadius: "lg",
});
const stackPropsAtom = atom({
  mt: "6",
  spacing: "3",
});
const headingPropsAtom = atom({
  size: "md",
});
const textPropsAtom = atom({});
const cardFooterPropsAtom = atom({});
const footerTextPropsAtom = atom({
  color: "blue.600",
  fontSize: "2xl",
});

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
    key: "cardProps",
    label: "Card Props",
    atom: cardPropsAtom,
    rows: 2,
  },
  {
    key: "cardBodyProps",
    label: "Card Body Props",
    atom: cardBodyPropsAtom,
    rows: 2,
  },
  {
    key: "imageProps",
    label: "Image Props",
    atom: imagePropsAtom,
    rows: 2,
  },
  {
    key: "stackProps",
    label: "Stack Props",
    atom: stackPropsAtom,
    rows: 2,
  },
  {
    key: "headingProps",
    label: "Heading Props",
    atom: headingPropsAtom,
    rows: 3,
  },
  {
    key: "textProps",
    label: "Text Props",
    atom: textPropsAtom,
    rows: 4,
  },
  {
    key: "cardFooterProps",
    label: "Card Footer Props",
    atom: cardFooterPropsAtom,
    rows: 2,
  },
  {
    key: "footerTextProps",
    label: "Footer Text Props",
    atom: footerTextPropsAtom,
    rows: 4,
  },
]);

const cardUiChakraPropsAtom = atom((get) => {
  const imageUri = get(imageUriAtom);
  const heading = get(headingAtom);
  const text = get(textAtom);
  const footerText = get(footerTextAtom);
  // ------------------------
  const cardProps = get(cardPropsAtom);
  const cardBodyProps = get(cardBodyPropsAtom);
  const imageProps = get(imagePropsAtom);
  const stackProps = get(stackPropsAtom);
  const headingProps = get(headingPropsAtom);
  const textProps = get(textPropsAtom);
  const cardFooterProps = get(cardFooterPropsAtom);
  const footerTextProps = get(footerTextPropsAtom);
  return {
    imageUri,
    heading,
    text,
    footerText,
    // ------------------------
    cardProps,
    cardBodyProps,
    imageProps,
    stackProps,
    headingProps,
    textProps,
    cardFooterProps,
    footerTextProps,
  };
});

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

function StyleField({ label, atom, rows }) {
  const [value, setValue] = useAtom(atom);
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Textarea
        rows={rows}
        defaultValue={JSON.stringify(value)}
        onChange={(e) => setValue(parseJson(e.target.value))}
      />
    </FormControl>
  );
}

function Content() {
  const textList = useAtomValue(textListAtom);
  const styleList = useAtomValue(styleListAtom);
  const cardUiChakraProps = useAtomValue(cardUiChakraPropsAtom);

  return (
    <SimpleGrid columns={[1, 2]} gap={4} p={10}>
      <VStack as="form" spacing={4}>
        {textList.map(({ key, ...restProps }) => (
          <TextField key={key} {...restProps} />
        ))}
        {styleList.map(({ key, ...restProps }) => (
          <StyleField key={key} {...restProps} />
        ))}
      </VStack>
      <div>
        <CardUIChakra {...cardUiChakraProps} />
      </div>
    </SimpleGrid>
  );
}

export default function PageHome({ searchParams }) {
  const homeStore = React.useMemo(
    () => createStoreWith(searchParams),
    [searchParams]
  );
  const pathname = usePathname();
  const router = useRouter();
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

function createStoreWith(searchParams) {
  const homeStore = createStore();
  homeStore.set(imageUriAtom, searchParams.imageUri || imageUriAtom.init);
  homeStore.set(headingAtom, searchParams.heading || headingAtom.init);
  homeStore.set(textAtom, searchParams.text || textAtom.init);
  homeStore.set(footerTextAtom, searchParams.footerText || footerTextAtom.init);
  // ------------------------
  homeStore.set(
    cardPropsAtom,
    parseJson(searchParams.cardProps) || cardPropsAtom.init
  );
  homeStore.set(
    cardBodyPropsAtom,
    parseJson(searchParams.cardBodyProps) || cardBodyPropsAtom.init
  );
  homeStore.set(
    imagePropsAtom,
    parseJson(searchParams.imageProps) || imagePropsAtom.init
  );
  homeStore.set(
    stackPropsAtom,
    parseJson(searchParams.stackProps) || stackPropsAtom.init
  );
  homeStore.set(
    headingPropsAtom,
    parseJson(searchParams.headingProps) || headingPropsAtom.init
  );
  homeStore.set(
    textPropsAtom,
    parseJson(searchParams.textProps) || textPropsAtom.init
  );
  homeStore.set(
    cardFooterPropsAtom,
    parseJson(searchParams.cardFooterProps) || cardFooterPropsAtom.init
  );
  homeStore.set(
    footerTextPropsAtom,
    parseJson(searchParams.footerTextProps) || footerTextPropsAtom.init
  );
  return homeStore;
}

const urlSearchParamsAtom = atom((get) => {
  const entries = Object.fromEntries(
    [
      { key: "imageUri", atom: imageUriAtom },
      { key: "heading", atom: headingAtom },
      { key: "text", atom: textAtom },
      { key: "footerText", atom: footerTextAtom },
      { key: "cardProps", atom: cardPropsAtom },
      { key: "cardBodyProps", atom: cardBodyPropsAtom },
      { key: "imageProps", atom: imagePropsAtom },
      { key: "stackProps", atom: stackPropsAtom },
      { key: "headingProps", atom: headingPropsAtom },
      { key: "textProps", atom: textPropsAtom },
      { key: "cardFooterProps", atom: cardFooterPropsAtom },
      { key: "footerTextProps", atom: footerTextPropsAtom },
    ].flatMap(({ key, atom }) => {
      const value = get(atom);
      return value && value !== atom.init
        ? [[key, key.endsWith("Props") ? JSON.stringify(value) : value]]
        : [];
    })
  );
  return new URLSearchParams(entries);
});
