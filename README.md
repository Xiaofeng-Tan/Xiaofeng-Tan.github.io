# Xiaofeng Tan · 谭晓锋

Personal academic website of [Xiaofeng Tan](https://xiaofeng-tan.github.io/), a
researcher working on reinforcement learning, generative AI, world models, and
human-centric perception, generation, and understanding.

The website presents my education, research experience, publications, academic
service, selected honors, and personal interests.

## Highlights

- Responsive academic homepage for desktop and mobile
- English and Simplified Chinese interface with one-click switching
- System-aware light and dark mode
- Compact, scrollable mobile sections for news, research, publications, and honors
- Publication pages with abstracts, project pages, preprints, code, and other resources
- Hidden contact details with one-click reveal and copy
- Academic CV preview and download

## What has been customized from the upstream al-folio theme

This repository keeps the core Jekyll and al-folio structure, but the original
template has been substantially adapted for a personal AI research website:

- **Content and information architecture:** the default demonstration content
  has been replaced with a research-focused homepage covering education,
  research experience, publications, academic service, honors, teaching, and
  personal interests.
- **Bilingual interface:** the site includes an English and Simplified Chinese
  interface, with translated section labels, navigation, and homepage content.
- **Unified navigation:** the original secondary section navigation has been
  merged into the primary navbar, including links to News, Education, Research,
  Publications, Honors, Teaching, Service, and Misc.
- **Mobile-first reading layout:** long sections such as News, Research,
  Publications, and Honors use touch-friendly internal scrolling on small
  screens instead of hiding content behind progressive-disclosure buttons.
- **Typography and visual system:** the site adds Songti for Chinese text,
  Gu Xingshu for selected Chinese handwriting and song annotations, a restrained
  academic color palette, responsive spacing, and system-aware dark mode.
- **Publication presentation:** publication metadata, venue badges, Spotlight
  and Poster distinctions, preprints, project pages, abstracts, and resource
  links have been reorganized for a compact academic presentation.
- **Contact and personal details:** email and WeChat are hidden by default and
  can be revealed and copied directly from the page.
- **Personal touches:** the homepage includes a motto, music and travel
  interests, linked references, and an optional Doraemon desk companion.

## Local development

### Requirements

- Ruby and Bundler
- Jekyll
- ImageMagick for responsive image generation
- Python with `nbconvert` if notebook-based content is rebuilt

### Preview locally

```bash
bundle install
bundle exec jekyll serve --host 127.0.0.1 --port 4000
```

Then open [http://127.0.0.1:4000/](http://127.0.0.1:4000/) in a browser.

To build the site without starting a server:

```bash
bundle exec jekyll build
```

The generated website is written to `_site/`.

## Project structure

| Path | Purpose |
| --- | --- |
| `_pages/about.md` | Homepage content and bilingual introduction |
| `_layouts/about.liquid` | Homepage structure and section layout |
| `_data/education.yml` | Education timeline data |
| `_data/research.yml` | Research experience data |
| `_bibliography/papers.bib` | Publication metadata and resource links |
| `projects/` | Individual project pages |
| `assets/css/` | Site-wide, language, and mobile styles |
| `assets/js/` | Navigation, language switching, interactions, and mobile behavior |
| `assets/pdf/` | Published CV files |

## Updating content

Most routine updates can be made in the following files:

1. Add or edit a publication in `_bibliography/papers.bib`.
2. Update education or research entries in `_data/education.yml` and
   `_data/research.yml`.
3. Update homepage prose and section labels in `_pages/about.md` and
   `_layouts/about.liquid`.
4. Add or update a project page under `projects/`.
5. Run a local build before publishing:

   ```bash
   bundle exec jekyll build
   ```

## Deployment

The site is deployed to GitHub Pages through the
[`Deploy site`](.github/workflows/deploy.yml) GitHub Actions workflow. Changes
to the website source are deployed when they are pushed to the `main` branch.

## Credits

This website is built with [Jekyll](https://jekyllrb.com/) and is based on the
[al-folio](https://github.com/alshedivat/al-folio) academic website theme,
with substantial customization for layout, typography, bilingual content,
mobile interaction, publication presentation, and academic CV integration.

See [LICENSE](LICENSE) for licensing information.
