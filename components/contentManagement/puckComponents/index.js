// Layout Components
export { Section } from './layout/Section';
export { Row } from './layout/Row';
export { Spacer } from './layout/Spacer';
export { Grid } from './layout/Grid';
export { Stack } from './layout/Stack';
export { FlexBox } from './layout/FlexBox';

// Typography Components
export { Heading } from './typography/Heading';
export { Paragraph } from './typography/Paragraph';
export { RichText } from './typography/RichText';

// Card Components
export { Card } from './cards/Card';
export { FeatureCard } from './cards/FeatureCard';
export { PricingCard } from './cards/PricingCard';
export { TestimonialCard } from './cards/TestimonialCard';
export { TeamCard } from './cards/TeamCard';
export { BlogCard } from './cards/BlogCard';
export { ProductCard } from './cards/ProductCard';
export { ServiceCard } from './cards/ServiceCard';
export { PortfolioCard } from './cards/PortfolioCard';
export { ComparisonCard } from './cards/ComparisonCard';

// Hero Components
export { HeroBasic } from './heroes/HeroBasic';
export { HeroSplit } from './heroes/HeroSplit';
export { HeroVideo } from './heroes/HeroVideo';
export { HeroSlider } from './heroes/HeroSlider';
export { HeroImage } from './heroes/HeroImage';
export { HeroAnimated } from './heroes/HeroAnimated';

// CTA Components
export { CTABanner } from './cta/CTABanner';
export { Newsletter } from './cta/Newsletter';
export { AnnouncementBar } from './cta/AnnouncementBar';
export { FloatingCTA } from './cta/FloatingCTA';
export { CTACard } from './cta/CTACard';

// Media Components
export { Video } from './media/Video';
export { Gallery } from './media/Gallery';
export { Carousel } from './media/Carousel';
export { ImageCompare } from './media/ImageCompare';
export { Icon } from './media/Icon';
export { Avatar } from './media/Avatar';
export { AudioPlayer } from './media/AudioPlayer';
export { LottieAnimation } from './media/LottieAnimation';

// Navigation Components
export { Accordion } from './navigation/Accordion';
export { Tabs } from './navigation/Tabs';
export { Breadcrumb } from './navigation/Breadcrumb';
export { StepIndicator } from './navigation/StepIndicator';
export { ScrollToTop } from './navigation/ScrollToTop';
export { TableOfContents } from './navigation/TableOfContents';

// Data Display Components
export { Stats } from './data/Stats';
export { Timeline } from './data/Timeline';
export { ProgressBar } from './data/ProgressBar';
export { CircularProgress } from './data/CircularProgress';
export { Countdown } from './data/Countdown';
export { Counter } from './data/Counter';
export { Metric } from './data/Metric';
export { SkillBars } from './data/SkillBars';

// Social Components
export { SocialLinks } from './social/SocialLinks';
export { ShareButtons } from './social/ShareButtons';
export { TrustBadges } from './social/TrustBadges';
export { ReviewStars } from './social/ReviewStars';
export { ClientLogos } from './social/ClientLogos';
export { TestimonialSlider } from './social/TestimonialSlider';

// Interactive Components
export { Modal } from './interactive/Modal';
export { Tooltip } from './interactive/Tooltip';
export { Popover } from './interactive/Popover';
export { Alert } from './interactive/Alert';
export { Toast } from './interactive/Toast';
export { Drawer } from './interactive/Drawer';

// Form Components
export { FormInput } from './forms/FormInput';
export { FormTextArea } from './forms/FormTextArea';
export { FormSelect } from './forms/FormSelect';
export { FormCheckbox } from './forms/FormCheckbox';
export { FormRadioGroup } from './forms/FormRadioGroup';
export { FormDatePicker } from './forms/FormDatePicker';
export { FormFileUpload } from './forms/FormFileUpload';
export { FormBuilder } from './forms/FormBuilder';

// Content Components
export { Quote } from './content/Quote';
export { List } from './content/List';
export { Badge } from './content/Badge';
export { Highlight } from './content/Highlight';
export { FAQ } from './content/FAQ';
export { Features } from './content/Features';
export { Steps } from './content/Steps';
export { ContentBlock } from './content/ContentBlock';
export { Testimonials } from './content/Testimonials';
export { PricingTable } from './content/PricingTable';

// E-Commerce Components
export { MarketplaceEmbed } from './ecommerce/Marketplace';
export { ShoppingCart } from './ecommerce/ShoppingCart';

// Maps Components
export { MapEmbed } from './maps/MapEmbed';
export { ContactInfo } from './maps/ContactInfo';
export { LocationCard } from './maps/LocationCard';

// Utility Components
export { HTMLEmbed } from './utility/HTMLEmbed';
export { IFrame } from './utility/IFrame';
export { CodeBlock } from './utility/CodeBlock';
export { Anchor } from './utility/Anchor';

// All components as a single object for easy merging with existing config
export const puckComponents = {
  // Layout
  Section: require('./layout/Section').Section,
  Row: require('./layout/Row').Row,
  Spacer: require('./layout/Spacer').Spacer,
  Grid: require('./layout/Grid').Grid,
  Stack: require('./layout/Stack').Stack,
  FlexBox: require('./layout/FlexBox').FlexBox,

  // Typography
  Heading: require('./typography/Heading').Heading,
  Paragraph: require('./typography/Paragraph').Paragraph,
  RichText: require('./typography/RichText').RichText,

  // Cards
  Card: require('./cards/Card').Card,
  FeatureCard: require('./cards/FeatureCard').FeatureCard,
  PricingCard: require('./cards/PricingCard').PricingCard,
  TestimonialCard: require('./cards/TestimonialCard').TestimonialCard,
  TeamCard: require('./cards/TeamCard').TeamCard,
  BlogCard: require('./cards/BlogCard').BlogCard,
  ProductCard: require('./cards/ProductCard').ProductCard,
  ServiceCard: require('./cards/ServiceCard').ServiceCard,
  PortfolioCard: require('./cards/PortfolioCard').PortfolioCard,
  ComparisonCard: require('./cards/ComparisonCard').ComparisonCard,

  // Heroes
  HeroBasic: require('./heroes/HeroBasic').HeroBasic,
  HeroSplit: require('./heroes/HeroSplit').HeroSplit,
  HeroVideo: require('./heroes/HeroVideo').HeroVideo,
  HeroSlider: require('./heroes/HeroSlider').HeroSlider,
  HeroImage: require('./heroes/HeroImage').HeroImage,
  HeroAnimated: require('./heroes/HeroAnimated').HeroAnimated,

  // CTA
  CTABanner: require('./cta/CTABanner').CTABanner,
  Newsletter: require('./cta/Newsletter').Newsletter,
  AnnouncementBar: require('./cta/AnnouncementBar').AnnouncementBar,
  FloatingCTA: require('./cta/FloatingCTA').FloatingCTA,
  CTACard: require('./cta/CTACard').CTACard,

  // Media
  Video: require('./media/Video').Video,
  Gallery: require('./media/Gallery').Gallery,
  Carousel: require('./media/Carousel').Carousel,
  ImageCompare: require('./media/ImageCompare').ImageCompare,
  Icon: require('./media/Icon').Icon,
  Avatar: require('./media/Avatar').Avatar,
  AudioPlayer: require('./media/AudioPlayer').AudioPlayer,
  LottieAnimation: require('./media/LottieAnimation').LottieAnimation,

  // Navigation
  Accordion: require('./navigation/Accordion').Accordion,
  Tabs: require('./navigation/Tabs').Tabs,
  Breadcrumb: require('./navigation/Breadcrumb').Breadcrumb,
  StepIndicator: require('./navigation/StepIndicator').StepIndicator,
  ScrollToTop: require('./navigation/ScrollToTop').ScrollToTop,
  TableOfContents: require('./navigation/TableOfContents').TableOfContents,

  // Data Display
  Stats: require('./data/Stats').Stats,
  Timeline: require('./data/Timeline').Timeline,
  ProgressBar: require('./data/ProgressBar').ProgressBar,
  CircularProgress: require('./data/CircularProgress').CircularProgress,
  Countdown: require('./data/Countdown').Countdown,
  Counter: require('./data/Counter').Counter,
  Metric: require('./data/Metric').Metric,
  SkillBars: require('./data/SkillBars').SkillBars,

  // Social
  SocialLinks: require('./social/SocialLinks').SocialLinks,
  ShareButtons: require('./social/ShareButtons').ShareButtons,
  TrustBadges: require('./social/TrustBadges').TrustBadges,
  ReviewStars: require('./social/ReviewStars').ReviewStars,
  ClientLogos: require('./social/ClientLogos').ClientLogos,
  TestimonialSlider: require('./social/TestimonialSlider').TestimonialSlider,

  // Interactive
  Modal: require('./interactive/Modal').Modal,
  Tooltip: require('./interactive/Tooltip').Tooltip,
  Popover: require('./interactive/Popover').Popover,
  Alert: require('./interactive/Alert').Alert,
  Toast: require('./interactive/Toast').Toast,
  Drawer: require('./interactive/Drawer').Drawer,

  // Forms
  FormInput: require('./forms/FormInput').FormInput,
  FormTextArea: require('./forms/FormTextArea').FormTextArea,
  FormSelect: require('./forms/FormSelect').FormSelect,
  FormCheckbox: require('./forms/FormCheckbox').FormCheckbox,
  FormRadioGroup: require('./forms/FormRadioGroup').FormRadioGroup,
  FormDatePicker: require('./forms/FormDatePicker').FormDatePicker,
  FormFileUpload: require('./forms/FormFileUpload').FormFileUpload,
  FormBuilder: require('./forms/FormBuilder').FormBuilder,

  // Content
  Quote: require('./content/Quote').Quote,
  List: require('./content/List').List,
  Badge: require('./content/Badge').Badge,
  Highlight: require('./content/Highlight').Highlight,
  FAQ: require('./content/FAQ').FAQ,
  Features: require('./content/Features').Features,
  Steps: require('./content/Steps').Steps,
  ContentBlock: require('./content/ContentBlock').ContentBlock,
  Testimonials: require('./content/Testimonials').Testimonials,
  PricingTable: require('./content/PricingTable').PricingTable,

  // E-Commerce
  MarketplaceEmbed: require('./ecommerce/Marketplace').MarketplaceEmbed,
  ShoppingCart: require('./ecommerce/ShoppingCart').ShoppingCart,

  // Maps
  MapEmbed: require('./maps/MapEmbed').MapEmbed,
  ContactInfo: require('./maps/ContactInfo').ContactInfo,
  LocationCard: require('./maps/LocationCard').LocationCard,

  // Utility
  HTMLEmbed: require('./utility/HTMLEmbed').HTMLEmbed,
  IFrame: require('./utility/IFrame').IFrame,
  CodeBlock: require('./utility/CodeBlock').CodeBlock,
  Anchor: require('./utility/Anchor').Anchor,
};

// Category definitions for Puck sidebar organization
export const puckCategories = {
  heroes: {
    title: 'Heroes',
    components: ['HeroBasic', 'HeroSplit', 'HeroVideo', 'HeroSlider', 'HeroImage', 'HeroAnimated'],
  },
  layout: {
    title: 'Layout',
    components: ['Section', 'Row', 'Spacer', 'Grid', 'Stack', 'FlexBox'],
  },
  typography: {
    title: 'Typography',
    components: ['Heading', 'Paragraph', 'RichText', 'Quote', 'List', 'Badge', 'Highlight'],
  },
  cards: {
    title: 'Cards',
    components: ['Card', 'FeatureCard', 'PricingCard', 'TestimonialCard', 'TeamCard', 'BlogCard', 'ProductCard', 'ServiceCard', 'PortfolioCard', 'ComparisonCard'],
  },
  media: {
    title: 'Media',
    components: ['Video', 'Gallery', 'Carousel', 'ImageCompare', 'Icon', 'Avatar', 'AudioPlayer', 'LottieAnimation'],
  },
  cta: {
    title: 'Call to Action',
    components: ['CTABanner', 'Newsletter', 'AnnouncementBar', 'FloatingCTA', 'CTACard'],
  },
  social: {
    title: 'Social & Trust',
    components: ['SocialLinks', 'ShareButtons', 'TrustBadges', 'ReviewStars', 'ClientLogos', 'TestimonialSlider'],
  },
  navigation: {
    title: 'Navigation',
    components: ['Accordion', 'Tabs', 'Breadcrumb', 'StepIndicator', 'ScrollToTop', 'TableOfContents'],
  },
  data: {
    title: 'Data Display',
    components: ['Stats', 'Timeline', 'ProgressBar', 'CircularProgress', 'Countdown', 'Counter', 'Metric', 'SkillBars'],
  },
  interactive: {
    title: 'Interactive',
    components: ['Modal', 'Tooltip', 'Popover', 'Alert', 'Toast', 'Drawer'],
  },
  forms: {
    title: 'Forms',
    components: ['FormInput', 'FormTextArea', 'FormSelect', 'FormCheckbox', 'FormRadioGroup', 'FormDatePicker', 'FormFileUpload', 'FormBuilder'],
  },
  content: {
    title: 'Content Blocks',
    components: ['FAQ', 'Features', 'Steps', 'ContentBlock', 'Testimonials', 'PricingTable'],
  },
  ecommerce: {
    title: 'E-Commerce',
    components: ['MarketplaceEmbed', 'ShoppingCart'],
  },
  maps: {
    title: 'Maps & Location',
    components: ['MapEmbed', 'ContactInfo', 'LocationCard'],
  },
  utility: {
    title: 'Utility',
    components: ['HTMLEmbed', 'IFrame', 'CodeBlock', 'Anchor'],
  },
};

export default puckComponents;
