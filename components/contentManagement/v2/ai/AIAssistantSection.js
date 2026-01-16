import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Snackbar,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BuildIcon from '@mui/icons-material/Build';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ListAltIcon from '@mui/icons-material/ListAlt';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { useAppTheme } from 'authscape';

const CodeBlock = ({ children, language = 'text' }) => {
  const { mode } = useAppTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: mode === 'dark' ? '#1a1a1a' : '#f5f5f5',
        borderRadius: 1,
        p: 2,
        mt: 1,
        mb: 2,
        fontFamily: 'monospace',
        fontSize: '0.85rem',
        overflow: 'auto',
        border: mode === 'dark' ? '1px solid #333' : '1px solid #e0e0e0',
      }}
    >
      <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'}>
        <IconButton
          size="small"
          onClick={handleCopy}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: mode === 'dark' ? '#888' : '#666',
          }}
        >
          {copied ? <CheckCircleIcon fontSize="small" color="success" /> : <ContentCopyIcon fontSize="small" />}
        </IconButton>
      </Tooltip>
      <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {children}
      </pre>
    </Box>
  );
};

const ExamplePrompt = ({ title, prompt }) => {
  const { mode } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 2,
        backgroundColor: mode === 'dark' ? '#1e3a5f' : '#e3f2fd',
        border: mode === 'dark' ? '1px solid #2196f3' : '1px solid #90caf9',
        borderRadius: 2,
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': {
          backgroundColor: mode === 'dark' ? '#1e4976' : '#bbdefb',
        },
      }}
      onClick={handleCopy}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ fontStyle: 'italic', color: mode === 'dark' ? '#90caf9' : '#1565c0' }}>
            "{prompt}"
          </Typography>
        </Box>
        <Tooltip title={copied ? 'Copied!' : 'Click to copy'}>
          <IconButton size="small">
            {copied ? <CheckCircleIcon fontSize="small" color="success" /> : <ContentCopyIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  );
};

export default function AIAssistantSection() {
  const { mode } = useTheme();
  const [expanded, setExpanded] = useState('overview');

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const apiEndpoints = [
    { method: 'POST', endpoint: '/api/AuthscapeMCP/ListPages', description: 'List all pages with filtering' },
    { method: 'GET', endpoint: '/api/AuthscapeMCP/GetPage', description: 'Get page by ID' },
    { method: 'POST', endpoint: '/api/AuthscapeMCP/CreatePage', description: 'Create a new page' },
    { method: 'POST', endpoint: '/api/AuthscapeMCP/UpdatePageContent', description: 'Update page content' },
    { method: 'POST', endpoint: '/api/AuthscapeMCP/AddComponent', description: 'Add component (real-time)' },
    { method: 'POST', endpoint: '/api/AuthscapeMCP/StartBuilding', description: 'Signal building started' },
    { method: 'POST', endpoint: '/api/AuthscapeMCP/FinishBuilding', description: 'Signal building complete' },
    { method: 'GET', endpoint: '/api/AuthscapeMCP/ListComponents', description: 'List available components' },
    { method: 'GET', endpoint: '/api/AuthscapeMCP/GetComponentSchema', description: 'Get component schema' },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <AutoAwesomeIcon sx={{ fontSize: 40, color: '#2196f3' }} />
          <Box>
            <Typography variant="h4" fontWeight={700}>
              AI Assistant
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Use Claude to build pages with natural language
            </Typography>
          </Box>
        </Box>

        <Alert severity="info" sx={{ mt: 2 }}>
          The AI Assistant allows you to describe what you want to build, and Claude will create it for you in real-time using the 100+ available components.
        </Alert>
      </Box>

      {/* Getting Started */}
      <Accordion
        expanded={expanded === 'overview'}
        onChange={handleAccordionChange('overview')}
        sx={{ mb: 2 }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PlayArrowIcon color="primary" />
            <Typography fontWeight={600}>Getting Started</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            The AuthScape MCP (Model Context Protocol) integration allows Claude to directly interact with your Content Management System. Here's how to use it:
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Step 1: Open a Page in the Visual Builder
          </Typography>
          <Typography variant="body2" paragraph>
            Navigate to <strong>Pages</strong> in the sidebar, select a page, and click the <strong>"Visual Builder"</strong> button. This opens the Puck editor where you'll see real-time updates.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Step 2: Connect Claude to AuthScape
          </Typography>
          <Typography variant="body2" paragraph>
            The AuthScape MCP API can be accessed in several ways:
          </Typography>

          <Typography variant="subtitle2" fontWeight={600} sx={{ mt: 2 }}>
            Option A: Claude Desktop (Recommended)
          </Typography>
          <Typography variant="body2" paragraph>
            Install the AuthScape MCP server to use with Claude Desktop:
          </Typography>
          <Typography variant="body2" paragraph>
            1. Build the MCP server from the AuthScape.Core solution:
          </Typography>
          <CodeBlock language="bash">
{`cd AuthScape.Core/Plugins/AuthScape.MCP
dotnet build -c Release`}
          </CodeBlock>
          <Typography variant="body2" paragraph>
            2. Configure Claude Desktop by editing the config file:
          </Typography>
          <Typography variant="caption" color="text.secondary" paragraph>
            Windows: %APPDATA%\Claude\claude_desktop_config.json<br/>
            macOS: ~/Library/Application Support/Claude/claude_desktop_config.json
          </Typography>
          <CodeBlock language="json">
{`{
  "mcpServers": {
    "authscape-cms": {
      "command": "C:/path/to/AuthScape.MCP.exe",
      "env": {
        "AUTHSCAPE_API_URL": "https://your-api-domain.com",
        "AUTHSCAPE_ACCESS_TOKEN": "your-access-token"
      }
    }
  }
}`}
          </CodeBlock>
          <Typography variant="body2" paragraph>
            3. Restart Claude Desktop to load the MCP server.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="subtitle2" fontWeight={600} sx={{ mt: 2 }}>
            Option B: Direct API Integration
          </Typography>
          <Typography variant="body2" paragraph>
            Use the REST API endpoints directly for custom integrations:
          </Typography>
          <CodeBlock language="text">
{`POST https://your-api-domain.com/api/AuthscapeMCP/ListPages
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN`}
          </CodeBlock>

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Tip:</strong> The .NET MCP server uses stdio transport, which Claude Desktop fully supports. This provides the best experience for building pages with natural language.
            </Typography>
          </Alert>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Step 3: Ask Claude to Build
          </Typography>
          <Typography variant="body2" paragraph>
            Simply describe what you want to build in natural language. Claude will use the available tools to create your page.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Example Prompts */}
      <Accordion
        expanded={expanded === 'examples'}
        onChange={handleAccordionChange('examples')}
        sx={{ mb: 2 }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AutoAwesomeIcon color="primary" />
            <Typography fontWeight={600}>Example Prompts</Typography>
            <Chip label="Copy & Use" size="small" color="primary" variant="outlined" sx={{ ml: 1 }} />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" paragraph color="text.secondary">
            Click any prompt below to copy it, then paste it to Claude:
          </Typography>

          <Typography variant="subtitle1" fontWeight={600} sx={{ mt: 2, mb: 1 }}>
            Landing Pages
          </Typography>
          <ExamplePrompt
            title="Product Landing Page"
            prompt="Create a landing page for our new SaaS product. Include a hero section with a catchy headline, features grid showing 6 key benefits, a pricing table with 3 tiers (Basic, Pro, Enterprise), customer testimonials, and a call-to-action section."
          />
          <ExamplePrompt
            title="Event Landing Page"
            prompt="Build a landing page for our upcoming tech conference. Add a hero with the event date and location, a countdown timer, speaker cards for 4 keynote speakers, an agenda timeline, and a registration CTA."
          />

          <Typography variant="subtitle1" fontWeight={600} sx={{ mt: 3, mb: 1 }}>
            Business Pages
          </Typography>
          <ExamplePrompt
            title="About Us Page"
            prompt="Create an About Us page with a hero showing our mission statement, a timeline of company milestones, team member cards for our leadership team (6 people), our core values in a features grid, and client logos."
          />
          <ExamplePrompt
            title="Services Page"
            prompt="Build a services page showcasing our 4 main offerings. Use service cards with icons, include a comparison table, add testimonials from satisfied clients, and end with a contact CTA."
          />

          <Typography variant="subtitle1" fontWeight={600} sx={{ mt: 3, mb: 1 }}>
            E-Commerce
          </Typography>
          <ExamplePrompt
            title="Product Showcase"
            prompt="Create a product showcase page with a hero featuring our flagship product, an image gallery, a features list with icons, pricing information, customer reviews with star ratings, and an Add to Cart section."
          />

          <Typography variant="subtitle1" fontWeight={600} sx={{ mt: 3, mb: 1 }}>
            Content Pages
          </Typography>
          <ExamplePrompt
            title="FAQ Page"
            prompt="Build an FAQ page with a search hero, organized accordions for different categories (General, Billing, Technical Support), and a contact section for additional questions."
          />
          <ExamplePrompt
            title="Blog Layout"
            prompt="Create a blog listing page with a hero, featured post card at the top, a grid of 6 blog cards with thumbnails and excerpts, category filters, and pagination."
          />
        </AccordionDetails>
      </Accordion>

      {/* Available Components */}
      <Accordion
        expanded={expanded === 'components'}
        onChange={handleAccordionChange('components')}
        sx={{ mb: 2 }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WidgetsIcon color="primary" />
            <Typography fontWeight={600}>Available Components</Typography>
            <Chip label="100+" size="small" color="success" sx={{ ml: 1 }} />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" paragraph>
            Claude has access to over 100 pre-built components organized into categories:
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {[
              { label: 'Heroes', count: 6 },
              { label: 'Layout', count: 6 },
              { label: 'Cards', count: 10 },
              { label: 'Typography', count: 3 },
              { label: 'Media', count: 8 },
              { label: 'Navigation', count: 6 },
              { label: 'Data Display', count: 8 },
              { label: 'Social', count: 6 },
              { label: 'Interactive', count: 6 },
              { label: 'Forms', count: 8 },
              { label: 'Content', count: 10 },
              { label: 'CTA', count: 4 },
              { label: 'E-Commerce', count: 2 },
              { label: 'Utility', count: 6 },
            ].map((cat) => (
              <Chip
                key={cat.label}
                label={`${cat.label} (${cat.count})`}
                variant="outlined"
                size="small"
              />
            ))}
          </Box>

          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            Popular Components
          </Typography>
          <List dense>
            {[
              'HeroBasic, HeroSplit, HeroVideo - Eye-catching page headers',
              'Section, Row, Grid, Stack, FlexBox - Layout containers',
              'Card, FeatureCard, PricingCard, TeamCard - Content cards',
              'Accordion, Tabs, Modal - Interactive elements',
              'Stats, Timeline, Countdown - Data visualization',
              'Testimonials, PricingTable, FAQ - Pre-built sections',
              'FormBuilder, FormInput - Form components',
              'Video, Gallery, Carousel - Media display',
            ].map((item, index) => (
              <ListItem key={index} sx={{ py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <CheckCircleIcon fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary={item}
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
            ))}
          </List>

          <Alert severity="success" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Tip:</strong> Ask Claude to "list available components" or "show me hero components" to see what's available with their properties.
            </Typography>
          </Alert>
        </AccordionDetails>
      </Accordion>

      {/* How It Works */}
      <Accordion
        expanded={expanded === 'realtime'}
        onChange={handleAccordionChange('realtime')}
        sx={{ mb: 2 }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <VisibilityIcon color="primary" />
            <Typography fontWeight={600}>How It Works</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            Claude uses the MCP (Model Context Protocol) to interact with your CMS:
          </Typography>

          <List>
            <ListItem>
              <ListItemIcon>
                <Chip label="1" size="small" color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Connect Claude"
                secondary="Configure Claude Desktop with the AuthScape MCP server"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Chip label="2" size="small" color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Describe Your Page"
                secondary="Tell Claude what you want to build in natural language"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Chip label="3" size="small" color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Review & Publish"
                secondary="Open the Visual Builder to review and publish the page"
              />
            </ListItem>
          </List>

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>How it works:</strong> Claude uses the MCP tools to create and update pages. Refresh the Visual Builder to see the changes after Claude finishes building.
            </Typography>
          </Alert>
        </AccordionDetails>
      </Accordion>

      {/* API Reference */}
      <Accordion
        expanded={expanded === 'api'}
        onChange={handleAccordionChange('api')}
        sx={{ mb: 2 }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BuildIcon color="primary" />
            <Typography fontWeight={600}>API Reference</Typography>
            <Chip label="Developer" size="small" variant="outlined" sx={{ ml: 1 }} />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" paragraph>
            These are the MCP API endpoints that Claude uses to interact with your CMS:
          </Typography>

          <Paper
            elevation={0}
            sx={{
              border: mode === 'dark' ? '1px solid #333' : '1px solid #e0e0e0',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            {apiEndpoints.map((api, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 1.5,
                  borderBottom: index < apiEndpoints.length - 1
                    ? (mode === 'dark' ? '1px solid #333' : '1px solid #e0e0e0')
                    : 'none',
                  '&:hover': {
                    backgroundColor: mode === 'dark' ? '#1a1a1a' : '#f5f5f5',
                  },
                }}
              >
                <Chip
                  label={api.method}
                  size="small"
                  color={api.method === 'GET' ? 'success' : 'primary'}
                  sx={{ minWidth: 60, mr: 2 }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: 'monospace',
                    flex: 1,
                    color: mode === 'dark' ? '#90caf9' : '#1565c0',
                  }}
                >
                  {api.endpoint}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {api.description}
                </Typography>
              </Box>
            ))}
          </Paper>

          <Typography variant="subtitle2" fontWeight={600} sx={{ mt: 3, mb: 1 }}>
            Authentication
          </Typography>
          <Typography variant="body2" paragraph>
            All endpoints require authentication via OpenIddict. Include a valid Bearer token in the Authorization header.
          </Typography>

          <CodeBlock>
{`curl -X POST "https://your-api/api/AuthscapeMCP/ListPages" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"search": "", "limit": 20}'`}
          </CodeBlock>
        </AccordionDetails>
      </Accordion>

      {/* Tips & Best Practices */}
      <Accordion
        expanded={expanded === 'tips'}
        onChange={handleAccordionChange('tips')}
        sx={{ mb: 2 }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircleIcon color="primary" />
            <Typography fontWeight={600}>Tips & Best Practices</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="success" />
              </ListItemIcon>
              <ListItemText
                primary="Be Specific"
                secondary="Instead of 'make a page', say 'create a landing page with a hero, 3 feature cards, and a pricing table'"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="success" />
              </ListItemIcon>
              <ListItemText
                primary="Mention Content"
                secondary="Provide actual text, headlines, and descriptions for more complete pages"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="success" />
              </ListItemIcon>
              <ListItemText
                primary="Reference Components"
                secondary="If you know specific component names, mention them: 'use HeroSplit with an image on the right'"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="success" />
              </ListItemIcon>
              <ListItemText
                primary="Iterate"
                secondary="Ask Claude to modify specific sections: 'change the hero background to blue' or 'add another testimonial'"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="success" />
              </ListItemIcon>
              <ListItemText
                primary="Keep Visual Builder Open"
                secondary="For real-time updates, keep the Visual Builder open while Claude builds your page"
              />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Footer */}
      <Paper
        elevation={0}
        sx={{
          mt: 4,
          p: 3,
          backgroundColor: mode === 'dark' ? '#1e3a5f' : '#e3f2fd',
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <AutoAwesomeIcon sx={{ fontSize: 40, color: '#2196f3', mb: 1 }} />
        <Typography variant="h6" gutterBottom>
          Ready to Build?
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Open a page in the Visual Builder and start describing what you want to create!
        </Typography>
      </Paper>
    </Box>
  );
}
