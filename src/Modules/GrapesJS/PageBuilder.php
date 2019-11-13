<?php

namespace PHPageBuilder\Modules\GrapesJS;

use PHPageBuilder\Contracts\PageBuilderContract;
use PHPageBuilder\Contracts\PageContract;
use PHPageBuilder\Contracts\ThemeContract;
use PHPageBuilder\Repositories\PageRepository;
use PHPageBuilder\Theme;
use Exception;
use PHPageBuilder\ThemeBlock;

class PageBuilder implements PageBuilderContract
{
    /**
     * @var ThemeContract $theme
     */
    protected $theme;

    /**
     * PageBuilder constructor.
     */
    public function __construct()
    {
        $this->theme = new Theme(phpb_config('themes'), phpb_config('themes.active_theme'));
    }

    /**
     * Set the theme used while rendering pages in the page builder.
     *
     * @param ThemeContract $theme
     */
    public function setTheme(ThemeContract $theme)
    {
        $this->theme = $theme;
    }

    /**
     * Process the current GET or POST request and redirect or render the requested page.
     *
     * @param $route
     * @param $action
     * @throws Exception
     */
    public function handleRequest($route, $action)
    {
        if ($route === 'pagebuilder') {
            $pageId = $_GET['page'] ?? null;
            $pageRepository = new PageRepository;
            $page = $pageRepository->findWithId($pageId);

            if (! ($page instanceof PageContract)) {
                die('Page not found');
            }

            switch ($action) {
                case 'edit':
                    $this->renderPageBuilder($page);
                    break;
                case 'store':
                    if (isset($_POST) && isset($_POST['data'])) {
                        $data = json_decode($_POST['data'], true);
                        $this->updatePage($page, $data);
                    }
                    break;
                case 'renderBlock':
                    if (isset($_POST['blockSlug']) && isset($_POST['blockId']) && isset($_POST['blocksData'])) {
                        $this->renderPageBuilderBlock(
                            $page,
                            $_POST['blockSlug'],
                            $_POST['blockId'],
                            json_decode($_POST['blocksData'], true)
                        );
                    }
            }

            exit();
        }
    }

    /**
     * Render the PageBuilder for the given page.
     *
     * @param PageContract $page
     */
    public function renderPageBuilder(PageContract $page)
    {
        // init variables that should be accessible in the view
        $pageBuilder = $this;
        $pageRenderer = new PageRenderer($this->theme, $page, true);

        // create an array of theme block adapters, adapting each theme block to the representation for GrapesJS
        $blocks = [];
        foreach ($this->theme->getThemeBlocks() as $themeBlock) {
            $blocks[] = new BlockAdapter($pageRenderer, $themeBlock);
        }

        require __DIR__ . '/resources/views/layout.php';
    }

    /**
     * Render the given page.
     *
     * @param PageContract $page
     * @throws Exception
     */
    public function renderPage(PageContract $page)
    {
        $renderer = new PageRenderer($this->theme, $page);
        echo $renderer->render();
    }

    /**
     * Render in context of the given page, the given block with the passed settings, for updating the pagebuilder.
     *
     * @param PageContract $page
     * @param $blockId
     * @param $blockSlug
     * @param array $blocksData
     * @throws Exception
     */
    public function renderPageBuilderBlock(PageContract $page, $blockSlug, $blockId, $blocksData = [])
    {
        $blocksData = is_array($blocksData) ? $blocksData : [];
        $block = new ThemeBlock($this->theme, $blockSlug);
        $block->id = $blockId;
        $renderer = new PageRenderer($this->theme, $page, true);
        echo $renderer->getGrapesJSBlockHtml($block, $blocksData);
    }

    /**
     * Update the given page with the given data (an array of html blocks)
     *
     * @param PageContract $page
     * @param $data
     * @return bool|object|null
     */
    public function updatePage(PageContract $page, $data)
    {
        $pageRepository = new PageRepository;
        return $pageRepository->updatePageData($page, $data);
    }

    /**
     * Return the list of all pages, used in CKEditor link editor.
     *
     * @return array
     */
    public function getPages()
    {
        $pages = [];

        $pageRepository = new PageRepository;
        foreach ($pageRepository->getAll() as $page) {
            $pages[] = [
                e($page->name),
                e($page->id)
            ];
        }

        return $pages;
    }

    /**
     * Return this page's components in the format passed to GrapesJS.
     *
     * @param PageContract $page
     * @return array
     */
    public function getPageComponents(PageContract $page)
    {
        $data = $page->getData();
        if (isset($data['components'])) {
            return $data['components'];
        }
        return [];
    }

    /**
     * Return this page's style in the format passed to GrapesJS.
     *
     * @param PageContract $page
     * @return array
     */
    public function getPageStyleComponents(PageContract $page)
    {
        $data = $page->getData();
        if (isset($data['style'])) {
            return $data['style'];
        }
        return [];
    }
}
